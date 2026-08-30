import { NextResponse } from 'next/server';
import { load } from 'cheerio';
import dns from 'dns/promises';
import net from 'net';

// Server-side crawler for the on-site SEO Analyzer tool. Fetches a
// user-supplied URL and runs a set of on-page checks — no third-party
// SEO API involved, so there's no per-scan cost and no API key to manage.
//
// SSRF guard: this endpoint fetches whatever URL a stranger types into a
// public form, so before fetching anything we resolve the hostname and
// reject private/loopback/link-local ranges. Without this, the tool is a
// generic "make our server request any internal address" primitive.
function isPrivateIp(ip) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number);
    if (a === 10) return true;
    if (a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 0) return true;
    return false;
  }
  const lower = ip.toLowerCase();
  return lower === '::1' || lower.startsWith('fe80:') || lower.startsWith('fc') || lower.startsWith('fd');
}

async function assertPublicHost(hostname) {
  const addrs = await dns.lookup(hostname, { all: true });
  if (addrs.length === 0) throw new Error('Could not resolve that domain.');
  for (const { address } of addrs) {
    if (isPrivateIp(address)) throw new Error('That address points at a private network and cannot be scanned.');
  }
}

function normalizeUrl(input) {
  let raw = String(input || '').trim();
  if (!raw) throw new Error('Enter a URL to scan.');
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  const url = new URL(raw);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Only http/https URLs are supported.');
  if (['localhost'].includes(url.hostname)) throw new Error('That address points at a private network and cannot be scanned.');
  return url;
}

async function fetchText(url, { timeoutMs = 8000 } = {}) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'DharmasEstheticDesign-SEOTool/1.0 (+https://dharmasestheticdesign.com/tools)' },
    });
    return res;
  } finally {
    clearTimeout(t);
  }
}

const WEIGHT = { title: 12, description: 12, h1: 10, headings: 6, images: 10, canonical: 8, viewport: 10, https: 8, og: 8, structuredData: 6, robots: 5, sitemap: 5 };
const MAX_SCORE = Object.values(WEIGHT).reduce((a, b) => a + b, 0);

function pushIssue(issues, { id, severity, title, why, fix }) {
  issues.push({ id, severity, title, why, fix });
}

export async function POST(request) {
  let target;
  try {
    const body = await request.json();
    target = normalizeUrl(body.url);
    await assertPublicHost(target.hostname);
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Invalid URL' }, { status: 400 });
  }

  let res;
  let html;
  try {
    res = await fetchText(target.toString());
    if (!res.ok) throw new Error(`The page responded with a ${res.status}. Cannot scan a page that does not load.`);
    html = await res.text();
  } catch (err) {
    const msg = err.name === 'AbortError' ? 'That page took too long to respond.' : (err.message || 'Could not load that page.');
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  const $ = load(html);
  const issues = [];
  let score = 0;
  const finalUrl = new URL(res.url || target.toString());

  if (finalUrl.protocol === 'https:') {
    score += WEIGHT.https;
  } else {
    pushIssue(issues, {
      id: 'https', severity: 'critical', title: 'Site is not served over HTTPS',
      why: 'Browsers flag non-HTTPS sites as "not secure," and Google uses HTTPS as a ranking signal. Both cost you trust and traffic.',
      fix: 'Get an SSL certificate installed (most hosts offer free ones via Let’s Encrypt) and redirect all HTTP traffic to HTTPS.',
    });
  }

  const title = $('head > title').first().text().trim();
  if (!title) {
    pushIssue(issues, { id: 'title-missing', severity: 'critical', title: 'No page title', why: 'The title tag is what shows up as the clickable headline in Google search results. Without one, Google picks something for you, and it is rarely flattering.', fix: 'Add a <title> tag with your main keyword and brand name, 30-60 characters.' });
  } else if (title.length < 15 || title.length > 65) {
    pushIssue(issues, { id: 'title-length', severity: 'warning', title: `Page title is ${title.length} characters (aim for 30-60)`, why: 'Titles that are too short waste a chance to describe the page; too long and Google truncates them in search results.', fix: 'Rewrite the title to land between 30 and 60 characters, keyword first.' });
    score += WEIGHT.title * 0.5;
  } else {
    score += WEIGHT.title;
  }

  const description = $('meta[name="description"]').attr('content')?.trim() || '';
  if (!description) {
    pushIssue(issues, { id: 'description-missing', severity: 'critical', title: 'No meta description', why: 'This is the preview text under your link in search results. Without it, Google grabs a random sentence off the page, which rarely sells the click.', fix: 'Add a meta description, 70-160 characters, that tells someone why they should click.' });
  } else if (description.length < 50 || description.length > 170) {
    pushIssue(issues, { id: 'description-length', severity: 'warning', title: `Meta description is ${description.length} characters (aim for 70-160)`, why: 'Too short leaves value on the table; too long gets cut off with an ellipsis in search results.', fix: 'Trim or expand the description to land in the 70-160 character range.' });
    score += WEIGHT.description * 0.5;
  } else {
    score += WEIGHT.description;
  }

  const h1s = $('h1');
  if (h1s.length === 0) {
    pushIssue(issues, { id: 'h1-missing', severity: 'critical', title: 'No H1 heading found', why: 'The H1 tells both visitors and Google what the page is actually about at a glance.', fix: 'Add one clear H1 headline near the top of the page that states what the page is about.' });
  } else if (h1s.length > 1) {
    pushIssue(issues, { id: 'h1-multiple', severity: 'warning', title: `${h1s.length} H1 tags found (should be exactly 1)`, why: 'Multiple H1s confuse search engines about which heading is the real page topic.', fix: 'Keep one H1 for the main headline and demote the rest to H2/H3.' });
    score += WEIGHT.h1 * 0.5;
  } else {
    score += WEIGHT.h1;
  }

  const h2Count = $('h2').length;
  if (h2Count === 0) {
    pushIssue(issues, { id: 'headings-flat', severity: 'warning', title: 'No H2 subheadings found', why: 'Subheadings break content into scannable sections — good for readers and for Google understanding your page structure.', fix: 'Break long sections of text under H2 subheadings that describe each part.' });
  } else {
    score += WEIGHT.headings;
  }

  const images = $('img');
  const missingAlt = images.filter((_, el) => !$(el).attr('alt')?.trim()).length;
  if (images.length > 0 && missingAlt > 0) {
    const ratio = missingAlt / images.length;
    pushIssue(issues, {
      id: 'images-alt', severity: ratio > 0.5 ? 'critical' : 'warning',
      title: `${missingAlt} of ${images.length} images are missing alt text`,
      why: 'Alt text is how Google (and screen readers) understand what is in your images. Product photos with no alt text are invisible to Google Image search.',
      fix: 'Add a short, descriptive alt attribute to every image, especially product photos.',
    });
    score += WEIGHT.images * Math.max(0, 1 - ratio);
  } else {
    score += WEIGHT.images;
  }

  const canonical = $('link[rel="canonical"]').attr('href');
  if (!canonical) {
    pushIssue(issues, { id: 'canonical-missing', severity: 'warning', title: 'No canonical tag', why: 'Without a canonical tag, duplicate versions of a page (with/without www, with tracking parameters) can split your SEO value between them instead of counting toward one URL.', fix: 'Add a self-referencing <link rel="canonical"> tag to every page.' });
  } else {
    score += WEIGHT.canonical;
  }

  const viewport = $('meta[name="viewport"]').attr('content');
  if (!viewport) {
    pushIssue(issues, { id: 'viewport-missing', severity: 'critical', title: 'No mobile viewport tag', why: 'Without this tag, phones render your site as a shrunk-down desktop page instead of a proper mobile layout — and most of your traffic is on a phone.', fix: 'Add a viewport meta tag with width=device-width, initial-scale=1 to the page head.' });
  } else {
    score += WEIGHT.viewport;
  }

  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogImage = $('meta[property="og:image"]').attr('content');
  if (!ogTitle || !ogImage) {
    pushIssue(issues, { id: 'og-missing', severity: 'warning', title: 'Missing social preview tags (Open Graph)', why: 'When someone shares your link on Facebook, Instagram, or iMessage, no title/image preview shows up — it looks broken or gets ignored.', fix: 'Add og:title, og:description, and og:image meta tags so shared links show a real preview.' });
  } else {
    score += WEIGHT.og;
  }

  const hasJsonLd = $('script[type="application/ld+json"]').length > 0;
  if (!hasJsonLd) {
    pushIssue(issues, { id: 'structured-data-missing', severity: 'info', title: 'No structured data (schema markup) found', why: 'Structured data is what lets Google show rich results — star ratings, prices, product info — directly in search results.', fix: 'Add JSON-LD structured data for your business or products (Product, LocalBusiness, or Organization schema).' });
  } else {
    score += WEIGHT.structuredData;
  }

  const origin = `${finalUrl.protocol}//${finalUrl.host}`;
  const [robotsRes, sitemapRes] = await Promise.allSettled([
    fetchText(`${origin}/robots.txt`, { timeoutMs: 5000 }),
    fetchText(`${origin}/sitemap.xml`, { timeoutMs: 5000 }),
  ]);
  const robotsOk = robotsRes.status === 'fulfilled' && robotsRes.value.ok;
  const sitemapOk = sitemapRes.status === 'fulfilled' && sitemapRes.value.ok;
  if (!robotsOk) {
    pushIssue(issues, { id: 'robots-missing', severity: 'warning', title: 'No robots.txt found', why: 'robots.txt tells search engines which parts of your site to crawl and points them at your sitemap.', fix: 'Add a robots.txt file at your site root that allows crawling and links to your sitemap.' });
  } else {
    score += WEIGHT.robots;
  }
  if (!sitemapOk) {
    pushIssue(issues, { id: 'sitemap-missing', severity: 'warning', title: 'No sitemap.xml found', why: 'A sitemap is the fastest way to get every page of your store discovered and indexed by Google.', fix: 'Generate a sitemap.xml listing your real pages and submit it in Google Search Console.' });
  } else {
    score += WEIGHT.sitemap;
  }

  const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
  const wordCount = bodyText ? bodyText.split(' ').length : 0;
  if (wordCount < 200) {
    pushIssue(issues, { id: 'thin-content', severity: 'info', title: `Only about ${wordCount} words of visible text on the page`, why: 'Very thin pages give Google little to understand the page is about, which can hurt rankings for competitive terms.', fix: 'Add real, useful copy — product details, benefits, FAQs — rather than just images and buttons.' });
  }

  const finalScore = Math.max(0, Math.min(100, Math.round((score / MAX_SCORE) * 100)));
  const severityOrder = { critical: 0, warning: 1, info: 2 };
  issues.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  return NextResponse.json({
    url: finalUrl.toString(),
    score: finalScore,
    counts: {
      critical: issues.filter((i) => i.severity === 'critical').length,
      warning: issues.filter((i) => i.severity === 'warning').length,
      info: issues.filter((i) => i.severity === 'info').length,
    },
    issues,
    meta: { title, description, wordCount },
  });
}

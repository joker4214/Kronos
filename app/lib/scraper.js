import axios from "axios";
import * as cheerio from "cheerio";

const MAX_CONTENT_LENGTH = 15000;

export async function scrapeWebsite(url) {
  const response = await axios.get(url, {
    timeout: 15000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; DharmaWidgetBot/1.0; +https://dharmasemporium.com)",
    },
  });

  const $ = cheerio.load(response.data);
  $("script, style, nav, footer, noscript, svg, iframe").remove();

  const text = $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim();

  return text.slice(0, MAX_CONTENT_LENGTH);
}

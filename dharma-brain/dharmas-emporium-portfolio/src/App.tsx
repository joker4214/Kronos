import { useEffect, useRef } from 'react';

type Row = {
  status: string;
  title: string;
  description: string;
  url: string;
  host: string;
  preview: string;
  pending?: boolean;
};

const ROWS: Row[] = [
  {
    status: 'Live client site',
    title: 'WorkBench Creations',
    description:
      'A one-person Royal Oak, MI garage shop making laser-engraved wood, backlit LED pieces, epoxy, and foam-sculpted art. One-of-a-kind work, built for people who make one-of-a-kind things.',
    url: 'https://workbench.dharmasemporium.com',
    host: 'workbench.dharmasemporium.com',
    preview: '/assets/workbench-preview.png',
  },
  {
    status: 'Concept build',
    title: 'Fairway Golf Club',
    description:
      "A championship course's whole online presence, imagined from the tee-time booking page down to league sign-ups — built to show what a real course's site could look like.",
    url: 'https://golf.dharmasemporium.com',
    host: 'golf.dharmasemporium.com',
    preview: '/assets/golf-preview.png',
  },
  {
    status: 'Concept build',
    title: 'House of Pearls',
    description:
      "A luxury wedding planning studio's full online presence — packages, planning flow, and booking, designed to feel as considered as the events themselves.",
    url: 'https://weddings.dharmasemporium.com',
    host: 'weddings.dharmasemporium.com',
    preview: '/assets/wedding-preview.png',
  },
  {
    status: 'Concept build',
    title: 'Event Planner Co.',
    description:
      'Packages, a planning-team page, and a full portfolio for a wedding and event studio — built to show what booking could feel like before a client ever asks.',
    url: 'https://events.dharmasemporium.com',
    host: 'events.dharmasemporium.com',
    preview: '/assets/events-preview.png',
  },
  {
    status: 'Concept build',
    title: 'D2 Events',
    description:
      'A second take on wedding, corporate, and social event planning — every button on the site actually works, start to finish.',
    url: 'https://d2events.dharmasemporium.com',
    host: 'd2events.dharmasemporium.com',
    preview: '/assets/d2events-preview.png',
  },
  {
    status: 'Concept build',
    title: 'Michigan Premier Events',
    description:
      'Corporate, government, and community event management across Michigan — a decade of work shown through a site built to feel current, not dated.',
    url: 'https://premierevents.dharmasemporium.com',
    host: 'premierevents.dharmasemporium.com',
    preview: '/assets/premierevents-preview.png',
  },
  {
    status: 'Concept build',
    title: "Nick's Auto Service",
    description:
      "A local auto repair and tire shop's full site — brakes, engine, transmission, electrical, free estimates, all one booking away.",
    url: 'https://nicksauto.dharmasemporium.com',
    host: 'nicksauto.dharmasemporium.com',
    preview: '/assets/nicksauto-preview.png',
  },
  {
    status: 'Concept build',
    title: 'Icon Auto Repair',
    description:
      'An AAA-approved auto repair and collision shop — brake, engine, and transmission work, built with the same trust signals a real shop needs online.',
    url: 'https://iconauto.dharmasemporium.com',
    host: 'iconauto.dharmasemporium.com',
    preview: '/assets/iconauto-preview.png',
  },
];

// Drop clips exported from Viblo into public/assets/hero/ and list them here
// in play order. Leave empty to keep the CSS gradient fallback.
const HERO_CLIPS = ['/assets/hero/clip-1.mp4', '/assets/hero/clip-2.mp4'];

function ScreeningRow({ row, flip }: { row: Row; flip: boolean }) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const tile = parallaxRef.current;
    if (!tile) return;

    let ticking = false;
    const update = () => {
      const rect = tile.parentElement!.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const progress = (rect.top + rect.height / 2 - viewportH / 2) / viewportH;
      const offset = progress * 24; // px of drift
      tile.style.transform = `translateY(${offset.toFixed(1)}px)`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`row${flip ? ' flip' : ''}`}>
      <div className="row-text">
        <p className="status">{row.status}</p>
        <h2>{row.title}</h2>
        <p>{row.description}</p>
        <a className="open" href={row.url} target="_blank" rel="noopener">
          Open {row.host}
        </a>
      </div>
      <div className={`row-media${row.pending ? ' pending' : ''}`}>
        <a href={row.url} target="_blank" rel="noopener" aria-label={`Open ${row.title}`}>
          <div className="browser-chrome">
            <div className="browser-dots">
              <span></span><span></span><span></span>
            </div>
            <div className="browser-url">{row.host}</div>
          </div>
          <div className="parallax-layer" ref={parallaxRef}>
            <div className="preview-img" style={{ backgroundImage: `url('${row.preview}')` }} />
          </div>
          <div className="tally">
            <span className="tally-dot"></span> Playing — click to open
          </div>
        </a>
      </div>
    </div>
  );
}

function HeroReel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !HERO_CLIPS.length) return; // keep the CSS gradient fallback

    container.classList.remove('no-clips');
    container.classList.add('has-clips');

    const CROSSFADE_SEC = 1.1;
    const vA = document.createElement('video');
    const vB = document.createElement('video');

    let index = 0;
    let current = vA;
    let next = vB;
    let transitioning = false;

    function playClip(video: HTMLVideoElement, src: string, makeLive: boolean) {
      video.src = src;
      video.currentTime = 0;
      video.play().catch(() => {});
      if (makeLive) video.classList.add('live');
    }

    function startCrossfade(v: HTMLVideoElement) {
      if (transitioning || v !== current) return;
      transitioning = true;
      index = (index + 1) % HERO_CLIPS.length;
      playClip(next, HERO_CLIPS[index], false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          next.classList.add('live');
          current.classList.remove('live');
        });
      });
      setTimeout(() => {
        [current, next] = [next, current];
        transitioning = false;
      }, CROSSFADE_SEC * 1000 + 100);
    }

    const cleanups: Array<() => void> = [];
    [vA, vB].forEach((v) => {
      v.muted = true;
      v.playsInline = true;
      v.preload = 'auto';
      container.appendChild(v);
      const onTimeUpdate = () => {
        if (v === current && !transitioning && v.duration && v.currentTime >= v.duration - CROSSFADE_SEC) {
          startCrossfade(v);
        }
      };
      const onEnded = () => startCrossfade(v);
      v.addEventListener('timeupdate', onTimeUpdate);
      v.addEventListener('ended', onEnded);
      cleanups.push(() => {
        v.removeEventListener('timeupdate', onTimeUpdate);
        v.removeEventListener('ended', onEnded);
        v.remove();
      });
    });

    playClip(current, HERO_CLIPS[0], true);

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return <div className="hero-media no-clips" ref={containerRef} />;
}

export default function App() {
  return (
    <>
      <div className="topbar">
        <span className="wordmark">Dharma's Esthetic Design</span>
        <nav>
          <a href="#work">Work</a>
        </nav>
      </div>

      <section className="hero">
        <HeroReel />
        <div className="hero-scrim"></div>
        <div className="hero-content">
          <h1>Every build looks like the business it was built for.</h1>
          <p>
            A running reel of sites designed and shipped by Dharma's Esthetic Design — one per
            client, built from scratch for the trade it serves.
          </p>
          <a className="hero-cta" href="#work">
            See the work
          </a>
        </div>
      </section>

      <main className="program" id="work">
        {ROWS.map((row, i) => (
          <ScreeningRow key={row.title} row={row} flip={i % 2 === 1} />
        ))}
      </main>

      <footer>
        Dharma's Esthetic Design — built by Jason Gregory. Want a site like one of these?{' '}
        <a href="https://dharmasestheticdesign.com" target="_blank" rel="noopener">
          dharmasestheticdesign.com
        </a>
      </footer>
    </>
  );
}

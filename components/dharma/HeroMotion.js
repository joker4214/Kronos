'use client';

import { useEffect, useRef } from 'react';

// Four soft light sources drifting in slow, independent elliptical loops --
// strictly locked to the brand's charcoal/electric-blue palette (no hue
// animation at all, unlike the BlobBackground/GradientDots combo this
// replaces, which stacked two separate hue-rotate animations and cycled
// through the full rainbow every ~20s).
const BLOBS = [
  { color: '#2F5FFF', baseX: 0.22, baseY: 0.38, radius: 0.5, speedX: 0.045, speedY: 0.03, phase: 0 },
  { color: '#5C82FF', baseX: 0.78, baseY: 0.3, radius: 0.42, speedX: 0.035, speedY: 0.05, phase: 2.4 },
  { color: '#1B2A63', baseX: 0.5, baseY: 0.82, radius: 0.55, speedX: 0.025, speedY: 0.02, phase: 4.1 },
  { color: '#5C82FF', baseX: 0.12, baseY: 0.85, radius: 0.32, speedX: 0.04, speedY: 0.045, phase: 1.2 },
];

function hexToRgba(hex, alpha) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

export default function HeroMotion() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf;
    let start = null;

    const draw = (t) => {
      if (start === null) start = t;
      const elapsed = (t - start) / 1000;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#16181C';
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'lighter';
      BLOBS.forEach((b) => {
        const wobble = prefersReducedMotion ? 0 : elapsed;
        const x = (b.baseX + Math.sin(wobble * b.speedX * 10 + b.phase) * 0.1) * width;
        const y = (b.baseY + Math.cos(wobble * b.speedY * 10 + b.phase) * 0.1) * height;
        const r = b.radius * Math.max(width, height);

        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, hexToRgba(b.color, 0.5));
        grad.addColorStop(1, hexToRgba(b.color, 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = 'source-over';

      if (!prefersReducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    };

    raf = requestAnimationFrame(draw);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        filter: 'blur(70px)',
      }}
    />
  );
}

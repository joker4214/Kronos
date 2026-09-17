// Any internal #anchor jump on this site rides `scroll-behavior: smooth`
// (globals.css) through several Framer Motion `whileInView` (Reveal)
// sections that are still settling as the browser passes through them --
// the further down the target, the more content it passes and the more
// the browser's one-shot landing calculation can drift. This helper does
// the normal scroll, then re-targets the same element once things have
// visually finished moving so any drift self-corrects, regardless of how
// far down the page the target sits.
export function smoothScrollToId(e, id) {
  if (e) e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Don't yank the page back if the visitor takes over scrolling themselves
  // during the settle window.
  const controller = new AbortController();
  const cancel = () => controller.abort();
  window.addEventListener('wheel', cancel, { signal: controller.signal, passive: true });
  window.addEventListener('touchmove', cancel, { signal: controller.signal, passive: true });
  window.addEventListener('keydown', cancel, { signal: controller.signal });

  setTimeout(() => {
    if (!controller.signal.aborted) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    controller.abort();
  }, 700);
}

// Apparition au défilement : chaque bloc se révèle une seule fois, quand il entre à l'écran.
// Sans IntersectionObserver ou avec « réduire les animations », rien n'est caché.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const targets = Array.from(
  document.querySelectorAll<HTMLElement>(
    '.sec__head, .log__row, .pf, .row, .file, .aside, .stack-tile, .p__shot, .reach, .mail',
  ),
);

if (!reduce && 'IntersectionObserver' in window && targets.length > 0) {
  document.documentElement.classList.add('reveal-on');
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  for (const el of targets) {
    el.classList.add('reveal');
    io.observe(el);
  }
}

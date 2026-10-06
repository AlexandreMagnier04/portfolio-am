// Carrousel des projets : plusieurs cartes visibles, défilement d'une carte à la fois.
// Le défilement horizontal natif (scroll-snap) fonctionne sans JavaScript ; ce script ajoute
// les boutons précédent/suivant, la barre de progression, le compteur, les flèches du clavier
// et le défilement automatique.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Une carte toutes les 5,5 s : assez lent pour lire le titre et le résumé.
const AUTOPLAY_MS = 5500;

document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
  const track = root.querySelector<HTMLElement>('.carousel__track');
  const prev = root.querySelector<HTMLButtonElement>('[data-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-next]');
  const bar = root.querySelector<HTMLElement>('[data-progress]');
  const count = root.querySelector<HTMLElement>('[data-count]');
  const toggle = root.querySelector<HTMLButtonElement>('[data-toggle]');
  if (!track || !prev || !next || !bar || !count) return;

  const cards = Array.from(track.children) as HTMLElement[];
  if (cards.length < 2) return;
  root.classList.add('carousel--js');

  const pad = (n: number) => String(n).padStart(2, '0');
  const step = () => (cards[1].offsetLeft - cards[0].offsetLeft) || 1;
  const first = () => Math.min(cards.length - 1, Math.max(0, Math.round(track.scrollLeft / step())));
  const visible = () => Math.max(1, Math.floor((track.clientWidth + 1) / step() + 0.15));
  const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;

  const go = (index: number) => {
    const i = Math.min(cards.length - 1, Math.max(0, index));
    track.scrollTo({ left: i * step(), behavior: reduce ? 'auto' : 'smooth' });
  };

  const update = () => {
    const a = first() + 1;
    const b = atEnd() ? cards.length : Math.min(cards.length, a + visible() - 1);
    count.textContent = a === b ? `${pad(a)} / ${pad(cards.length)}` : `${pad(a)}–${pad(b)} / ${pad(cards.length)}`;
    const max = track.scrollWidth - track.clientWidth;
    bar.style.transform = `scaleX(${max > 0 ? Math.max(0.08, track.scrollLeft / max) : 1})`;
    // aria-disabled plutôt que disabled : le bouton garde le focus clavier quand on arrive au bout
    prev.setAttribute('aria-disabled', String(track.scrollLeft <= 2));
    next.setAttribute('aria-disabled', String(atEnd()));
  };
  const off = (b: HTMLButtonElement) => b.getAttribute('aria-disabled') === 'true';

  // ---------- défilement automatique ----------
  // Jamais avec « réduire les animations » : le bouton pause n'a alors pas lieu d'être.
  const autoplay = !reduce;
  let userPaused = false; // pause demandée avec le bouton
  let hovering = false; // souris sur le carrousel
  let focused = false; // le focus clavier est dans le carrousel
  let inView = false; // le carrousel est visible à l'écran
  let lastAction = performance.now(); // dernier mouvement (automatique ou non)

  const touch = () => { lastAction = performance.now(); };

  // le compteur ne doit pas être annoncé toutes les 5 secondes par un lecteur d'écran
  const syncLive = () => count.setAttribute('aria-live', autoplay && !userPaused ? 'off' : 'polite');

  if (!autoplay) {
    toggle?.remove();
  } else {
    syncLive();
    if (toggle) {
      toggle.addEventListener('click', () => {
        userPaused = !userPaused;
        toggle.textContent = userPaused ? 'lecture' : 'pause';
        toggle.setAttribute('aria-pressed', String(userPaused));
        toggle.setAttribute('aria-label', userPaused ? 'Relancer le défilement automatique' : 'Mettre le défilement automatique en pause');
        syncLive();
        touch();
      });
    }

    root.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') hovering = true; });
    root.addEventListener('pointerleave', () => { hovering = false; touch(); });
    root.addEventListener('focusin', () => { focused = true; });
    root.addEventListener('focusout', () => { focused = false; touch(); });
    // toucher, glisser ou utiliser la molette : on laisse le temps de regarder avant de reprendre
    for (const type of ['pointerdown', 'wheel', 'touchstart'] as const) {
      track.addEventListener(type, touch, { passive: true });
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(
        (entries) => { inView = entries.some((e) => e.isIntersecting); if (inView) touch(); },
        { threshold: 0.4 },
      ).observe(root);
    } else {
      inView = true;
    }

    window.setInterval(() => {
      if (userPaused || hovering || focused || !inView || document.hidden) return;
      if (performance.now() - lastAction < AUTOPLAY_MS) return;
      root.dataset.autoplayTicks = String(Number(root.dataset.autoplayTicks ?? 0) + 1);
      // au bout de la piste, on revient au début
      go(atEnd() ? 0 : first() + 1);
      touch();
    }, 250);
  }

  prev.addEventListener('click', () => { touch(); if (!off(prev)) go(first() - 1); });
  next.addEventListener('click', () => { touch(); if (!off(next)) go(first() + 1); });
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); touch(); go(first() - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); touch(); go(first() + 1); }
  });

  let ticking = false;
  track.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
});

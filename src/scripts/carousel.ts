// Carrousel des projets : plusieurs cartes visibles, défilement d'une carte à la fois.
// Le défilement horizontal natif (scroll-snap) fonctionne sans JavaScript ; ce script ajoute
// les boutons précédent/suivant, la barre de progression, le compteur et les flèches du clavier.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
  const track = root.querySelector<HTMLElement>('.carousel__track');
  const prev = root.querySelector<HTMLButtonElement>('[data-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-next]');
  const bar = root.querySelector<HTMLElement>('[data-progress]');
  const count = root.querySelector<HTMLElement>('[data-count]');
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

  prev.addEventListener('click', () => { if (!off(prev)) go(first() - 1); });
  next.addEventListener('click', () => { if (!off(next)) go(first() + 1); });
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(first() - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(first() + 1); }
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

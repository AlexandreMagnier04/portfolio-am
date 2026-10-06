// Écran de chargement « AM » : visible 1,5 s au minimum (le temps de lire l'animation),
// plus longtemps si la page n'est pas encore chargée, et jamais plus de 4 s.
// La classe `is-loading` est posée avant l'affichage par le script inline de Layout.astro.
const loader = document.getElementById('loader');
const root = document.documentElement;

if (loader && root.classList.contains('is-loading')) {
  const MIN_MS = 1500;
  const MAX_MS = 4000;
  const FADE_MS = 550;
  const start = performance.now();
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    loader.classList.add('is-leaving');
    try {
      sessionStorage.setItem('loaded', '1');
    } catch {
      // stockage indisponible : l'écran se réaffichera à la prochaine page, sans gravité
    }
    window.setTimeout(() => {
      root.classList.remove('is-loading');
      loader.classList.remove('is-leaving');
    }, FADE_MS);
  };

  const whenReady = () => {
    const wait = Math.max(0, MIN_MS - (performance.now() - start));
    window.setTimeout(finish, wait);
  };

  if (document.readyState === 'complete') whenReady();
  else window.addEventListener('load', whenReady, { once: true });

  window.setTimeout(finish, MAX_MS);
}

// Bouton de thème : auto (système) → light → dark → auto. Le choix est mémorisé.
type Mode = 'auto' | 'light' | 'dark';
const ORDER: Mode[] = ['auto', 'light', 'dark'];

const button = document.getElementById('theme-toggle');
const root = document.documentElement;

const read = (): Mode => {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // stockage indisponible (navigation privée, par exemple) : on reste en auto
  }
  return 'auto';
};

const apply = (mode: Mode) => {
  if (mode === 'auto') delete root.dataset.theme;
  else root.dataset.theme = mode;
  if (button) {
    button.textContent = `theme --${mode}`;
    // le nom accessible reprend le texte visible, puis dit à quoi sert le bouton
    button.setAttribute('aria-label', `theme --${mode} : changer de thème`);
  }
};

if (button) {
  let current = read();
  apply(current);
  button.addEventListener('click', () => {
    current = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
    apply(current);
    try {
      if (current === 'auto') localStorage.removeItem('theme');
      else localStorage.setItem('theme', current);
    } catch {
      // le thème s'applique quand même pour cette visite
    }
  });
}

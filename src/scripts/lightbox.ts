// Agrandissement des captures d'un projet : un <dialog> natif, navigable au clavier.
// Les images cliquables sont les boutons portant data-zoom (voir ImageSlot.astro).
const dialog = document.getElementById('lightbox') as HTMLDialogElement | null;
const triggers = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-zoom]'));

if (dialog && triggers.length > 0) {
  const image = dialog.querySelector('img') as HTMLImageElement;
  const caption = dialog.querySelector('.lightbox__cap') as HTMLElement;
  const prev = dialog.querySelector('[data-prev]') as HTMLButtonElement;
  const next = dialog.querySelector('[data-next]') as HTMLButtonElement;
  const close = dialog.querySelector('[data-close]') as HTMLButtonElement;
  let index = 0;

  const show = (i: number) => {
    index = (i + triggers.length) % triggers.length;
    const t = triggers[index];
    image.src = t.dataset.zoom ?? '';
    image.alt = t.dataset.alt ?? '';
    caption.textContent = [t.dataset.caption, `${index + 1} / ${triggers.length}`].filter(Boolean).join(' · ');
  };

  if (triggers.length < 2) {
    prev.hidden = true;
    next.hidden = true;
  }

  triggers.forEach((t, i) =>
    t.addEventListener('click', () => {
      show(i);
      dialog.showModal();
    }),
  );
  prev.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  close.addEventListener('click', () => dialog.close());
  // clic sur le fond sombre : fermer
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
}

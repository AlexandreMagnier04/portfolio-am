const tree = document.getElementById('tree');
const marker = document.getElementById('marker');
const statusPath = document.getElementById('status-path');
const statusPos = document.getElementById('status-pos');

if (tree && marker && 'IntersectionObserver' in window) {
  const links = Array.from(tree.querySelectorAll<HTMLAnchorElement>('a[data-target]'));

  const activate = (id: string) => {
    for (const a of links) {
      if (a.dataset.target === id) {
        a.setAttribute('aria-current', 'true');
        marker.style.setProperty('--y', `${a.parentElement!.offsetTop}px`);
        marker.style.height = `${a.offsetHeight}px`;
        marker.classList.add('is-on');
        if (statusPath?.lastElementChild) {
          statusPath.lastElementChild.textContent = a.dataset.label ?? '';
        }
      } else {
        a.removeAttribute('aria-current');
      }
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (entry.isIntersecting) activate(entry.target.id);
    },
    { rootMargin: '-40% 0px -55% 0px' },
  );

  for (const a of links) {
    const section = document.getElementById(a.dataset.target ?? '');
    if (section) observer.observe(section);
  }
  if (links[0]?.dataset.target) activate(links[0].dataset.target);
}

if (statusPos) {
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
        statusPos.textContent = p <= 0 ? 'haut' : p >= 100 ? 'bas' : `${p} %`;
        ticking = false;
      });
    },
    { passive: true },
  );
}

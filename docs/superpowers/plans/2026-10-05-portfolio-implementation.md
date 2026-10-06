# Portfolio — Implémentation du site (direction « terminal ») : Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le vrai site Astro à partir de la maquette `design-explorations/terminal/index.html`, avec la palette bleue de la photo, tous les projets (emplacements d'images prévus), une page par projet, et le statut « en recherche de poste ».

**Architecture:** Un layout `Layout.astro` (html/head) enveloppé par `Shell.astro` (cadre « terminal » : arborescence, barre de commande, barre d'état). Des composants par section (`Hero`, `ExperienceLog`, `ProjectsSection`, `Skills`, `Contact`) lisent `src/data/*.json` et la collection `projects` via `src/lib/content.ts`. Deux pages : `index.astro` et `projets/[slug].astro`. CSS global unique (`src/styles/global.css`) porté depuis la maquette. Un seul script client (`src/scripts/scroll-spy.ts`).

**Tech Stack:** Astro 7.3, Tailwind 4.3 (préflight uniquement, le design est en CSS maison), content collections, `astro:assets`, Martian Mono (Google Fonts).

**Spec :** `docs/superpowers/specs/2026-10-05-portfolio-redesign-design.md` (section « Direction retenue »).
**Référence visuelle :** `design-explorations/terminal/index.html`.

**Règles du projet :** pas de dépôt git (pas de commits), pas de framework de tests : la vérification est `pnpm astro build`, des contrôles de fichiers et des captures. Alexandre apprend Astro : chaque tâche a une note « Ce que vous apprenez » à relayer dans le compte rendu.

---

## Structure des fichiers

| Fichier | Responsabilité |
|---|---|
| `src/styles/global.css` | Jetons de design, base, cadre terminal, sections (porté de la maquette) |
| `src/layouts/Layout.astro` | `<html>`, `<head>`, polices, favicon, skip link |
| `src/layouts/Shell.astro` | Cadre : arborescence, barre de commande, `<main>`, barre d'état, script |
| `src/components/Tree.astro` | Arborescence latérale (navigation) |
| `src/components/Hero.astro` | Présentation |
| `src/components/ExperienceLog.astro` | Journal des expériences |
| `src/components/ImageSlot.astro` | Image de projet ou emplacement « capture à venir » |
| `src/components/ProjectFeatured.astro` | Projet mis en avant (grand) |
| `src/components/ProjectRow.astro` | Projet en ligne compacte |
| `src/components/ProjectsSection.astro` | Section projets (mis en avant + autres) |
| `src/components/Skills.astro` | Compétences en fichier `.yml` |
| `src/components/Contact.astro` | Contact |
| `src/lib/content.ts` | Accès aux données et aides (tri, formatage) |
| `src/scripts/scroll-spy.ts` | Marqueur de l'arborescence + barre d'état |
| `src/pages/index.astro` | Accueil |
| `src/pages/projets/[slug].astro` | Page projet |
| `src/pages/404.astro` | Page introuvable |
| `public/favicon.svg` | Favicon « AM » |

---

### Task 1: Jetons, CSS global, layout et favicon

**Files:**
- Modify: `src/styles/global.css`, `src/layouts/Layout.astro`
- Create: `public/favicon.svg` (remplace celui du starter)
- Delete: `public/favicon.ico`

**Ce que vous apprenez :** `src/styles/` et l'import d'un CSS global dans un layout ; `public/` (fichiers servis tels quels) ; `<slot />` d'un layout.

- [ ] **Step 1: Écrire l'en-tête de `global.css` (jetons)**

```css
@import "tailwindcss";

:root {
  /* Palette tirée de la photo : fond #112343 (identique au bleu du CV) */
  --paper: #F1F4F8;
  --ink: #112343;
  --mute: #4A5A75;
  --rule: #CBD3E0;
  --accent: #2457D6;
  --accent-on-ink: #8FB0FF;   /* accent éclairci, lisible sur fond --ink */
  --glyph: #8A97AE;           /* décoratif uniquement (├── │) */
  --lineno: #5F6E88;
  --shot-bg: #ffffff;

  --mono: "Martian Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  --side: 17rem;
  --gut: clamp(1rem, 3.5vw, 3rem);
  --step--1: 0.78rem;
  --step-0: 0.9rem;
  --step-1: 1.05rem;
}
```

- [ ] **Step 2: Porter le CSS de la maquette**

Run (bash, depuis la racine du projet) :

```bash
cd "c:/Users/alexm/Documents/dev/perso/mywebsite"
M=design-explorations/terminal/index.html
{
  echo ""
  # lignes 33-213 : base, cadre, hero, journal, début projets ; 222-305 : compétences, contact, statut, responsive
  sed -n '33,213p;222,305p' "$M" \
  | sed -e 's/#A8A396/var(--glyph)/' \
        -e 's/#6E6A61/var(--lineno)/' \
        -e 's/#E58A6B/var(--accent-on-ink)/' \
        -e 's/background: #fff/background: var(--shot-bg)/' \
        -e '/\.p--/d'
} >> src/styles/global.css
```

Vérifier : `grep -c "p--" src/styles/global.css` doit afficher `0`, et `grep -n "#[0-9A-Fa-f]\{6\}" src/styles/global.css` ne doit lister que les valeurs du bloc `:root` (lignes du Step 1).

- [ ] **Step 3: Ajouter les règles propres au site (projets, lignes, emplacements, page projet)**

Ajouter à la fin de `src/styles/global.css` :

```css
.tree__glyph { white-space: pre; }

/* ---------- projets mis en avant : sous-grille, alternance gauche/droite ---------- */
.pf {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  align-items: end;
  border-top: 1px solid var(--ink);
  padding-top: 1.2rem;
}
.pf__text { grid-column: 1 / 6; }
.pf__shot { grid-column: 6 / 13; }
.pf--flip .pf__text { grid-column: 8 / 13; grid-row: 1; }
.pf--flip .pf__shot { grid-column: 1 / 8; grid-row: 1; }
.p__title a { text-decoration: none; }
.p__title a:hover { text-decoration: underline; text-decoration-thickness: 1px; }

/* ---------- emplacement d'image manquante ---------- */
.p__slot {
  aspect-ratio: 16 / 10;
  display: grid; place-items: center;
  border: 1px dashed var(--mute);
  background: transparent;
  font-size: var(--step--1);
}
.p__shot--empty { border-style: dashed; background: transparent; }

/* ---------- autres projets : lignes compactes ---------- */
.rows { grid-column: 1 / -1; list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--ink); }
.row { border-bottom: 1px solid var(--rule); }
.row__link {
  display: grid; grid-template-columns: 22ch minmax(0, 1fr) minmax(0, 24ch) minmax(0, 22ch);
  column-gap: clamp(1rem, 2vw, 2rem);
  padding: .9rem 0; text-decoration: none;
  font-size: var(--step--1); font-variation-settings: "wdth" 75;
}
.row__link:hover .row__title { color: var(--accent); }
.row__path { color: var(--mute); }
.row__title { font-weight: 650; font-variation-settings: "wdth" 100; }
.row__meta, .row__stack { color: var(--mute); }
.proj__sub { grid-column: 1 / -1; margin: 1rem 0 -1.5rem; }

/* ---------- page projet : texte Markdown ---------- */
.md { grid-column: 1 / 9; max-width: 62ch; }
.md h2 { margin: 2.2rem 0 .5rem; font-size: var(--step-1); font-weight: 650; font-variation-settings: "wdth" 100; }
.md h2::before { content: "## "; color: var(--accent); }
.md p { margin: 0 0 1rem; }
.md ul { list-style: none; margin: 0 0 1rem; padding: 0; }
.md li { padding-left: 2ch; text-indent: -2ch; }
.md li::before { content: "- "; color: var(--mute); }
.gallery { grid-column: 1 / -1; display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr)); }
.pager { grid-column: 1 / -1; display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; font-size: var(--step--1); border-top: 1px solid var(--ink); padding-top: 1rem; }

@media (max-width: 900px) {
  .pf, .pf--flip { display: block; }
  .pf__shot, .pf--flip .pf__shot { margin-top: 1.25rem; }
  .row__link { grid-template-columns: minmax(0, 1fr); row-gap: .15rem; }
  .md { grid-column: 1 / -1; }
}
```

- [ ] **Step 4: Layout**

`src/layouts/Layout.astro` :

```astro
---
import '../styles/global.css';

interface Props { title?: string; description?: string }
const {
  title = 'Alexandre Magnier — Software Engineer',
  description = "Portfolio d'Alexandre Magnier, Software Engineer : expériences, projets, compétences et contact.",
} = Astro.props;
---
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <meta name="description" content={description} />
    <meta name="generator" content={Astro.generator} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Martian+Mono:wdth,wght@75..112.5,100..800&display=swap"
      rel="stylesheet"
    />
    <title>{title}</title>
  </head>
  <body>
    <a class="skip" href="#contenu">Aller au contenu</a>
    <slot />
  </body>
</html>
```

- [ ] **Step 5: Favicon**

```bash
rm public/favicon.ico
```

`public/favicon.svg` :

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#112343"/><text x="16" y="22" text-anchor="middle" font-family="monospace" font-size="15" font-weight="700" fill="#F1F4F8">AM</text></svg>
```

- [ ] **Step 6: Vérifier**

Run: `pnpm astro build`
Expected: build sans erreur.

---

### Task 2: Données, schéma enrichi et helpers

**Files:**
- Modify: `src/content.config.ts`, `src/data/profile.json`, `src/content/projects/*.md` (ajout de `frame`)
- Create: `src/lib/content.ts`

**Ce que vous apprenez :** `src/lib/` (utilitaires), `src/data/` (JSON importé directement) face à `src/content/` (collection validée) ; ajouter un champ à un schéma Zod.

- [ ] **Step 1: Enrichir le schéma**

Dans `src/content.config.ts`, ajouter dans `z.object({ … })`, après `cover: image().optional(),` :

```ts
      coverAlt: z.string().optional(),
      frame: z.string().optional(),
```

- [ ] **Step 2: Renseigner `frame` dans chaque fiche projet**

Ajouter la ligne suivante dans le frontmatter (juste avant la ligne `stack:`) de chaque fichier :

| Fichier | Ligne à ajouter |
|---|---|
| `diffusion-contenus-iesi.md` | `frame: "Alternance · IESI · 09/2025 → 06/2026"` |
| `marketplace-marmite.md` | `frame: "Stage · La Marmite Digitale · 04/2025 → 06/2025"` |
| `refonte-responsive-iesi.md` | `frame: "CDD · IESI · 08/2025 → 09/2025"` |
| `sonde.md` | `frame: "Stage · IESI · 04/2024 → 06/2024"` |
| `tickets-iesi.md` | `frame: "Stage · IESI · 04/2024 → 06/2024"` |
| `white-hat.md`, `airbnb.md`, `cybersim.md`, `echoes.md`, `films.md`, `spotify.md` | `frame: "Projet d'école · MyDigitalSchool"` |

Si Alexandre a retiré des projets d'école (voir sa décision), ne traiter que les fichiers restants.

- [ ] **Step 3: Nettoyer `profile.json`**

Remplacer le fichier entier par (retrait de `location`, `age`, `photo` ; ajout de `availability`) :

```json
{
  "name": "Alexandre Magnier",
  "title": "Software Engineer",
  "tagline": "Diplômé Concepteur Développeur d'Applications, j'ai une expérience concrète en entreprise : applications développées de bout en bout, refonte UX/UI, intégration d'IA et d'API. Je suis particulièrement à l'aise avec l'écosystème Node.js et je m'adapte à d'autres langages et technologies selon les besoins.",
  "availability": "En recherche de poste",
  "mobility": "Mobile sur Lille, Douai, Lens et Arras · Permis B, véhiculé",
  "email": "a.magnier.pro@gmail.com",
  "phone": "06 99 69 15 14",
  "github": "https://github.com/AlexandreMagnier04",
  "linkedin": "https://www.linkedin.com/in/alexandre-magnier",
  "cv": "/cv-alexandre-magnier.pdf"
}
```

- [ ] **Step 4: Helpers**

`src/lib/content.ts` :

```ts
import { getCollection, type CollectionEntry } from 'astro:content';
import profile from '../data/profile.json';
import experience from '../data/experience.json';
import education from '../data/education.json';
import skills from '../data/skills.json';

export { profile, experience, education, skills };
export type Project = CollectionEntry<'projects'>;

/** Valeur de remplissage imposée par le schéma : à ne jamais afficher. */
const PLACEHOLDER_STACK = 'À préciser';

export const displayStack = (stack: string[]): string[] =>
  stack.filter((tech) => tech !== PLACEHOLDER_STACK);

/** "Mérignies (59710)" → "Mérignies" */
export const stripPostcode = (place: string): string =>
  place.replace(/\s*\(\d{5}\)/, '').trim();

export const period = (start: string, end: string): string => `${start} → ${end}`;

/** "Bases de données & ORM" → "bases_de_donnees_orm" */
export const yamlKey = (label: string): string =>
  label
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.sort((a, b) => a.data.order - b.data.order);
}
```

- [ ] **Step 5: Vérifier**

Run: `pnpm astro build`
Expected: build sans erreur de schéma (un `frame` mal placé fait échouer la validation, c'est voulu).

---

### Task 3: Cadre « terminal » (Shell, Tree, script)

**Files:**
- Create: `src/layouts/Shell.astro`, `src/components/Tree.astro`, `src/scripts/scroll-spy.ts`

**Ce que vous apprenez :** un layout peut en envelopper un autre ; les `<script>` d'un composant sont empaquetés par Astro et peuvent importer du TypeScript ; `Astro.props` et le typage des props.

- [ ] **Step 1: `Tree.astro`**

```astro
---
interface Item {
  href: string;
  label: string;
  /** id de la section suivie par le marqueur (absent pour les sous-éléments) */
  target?: string;
  sub?: boolean;
}
interface Props {
  root: string;
  items: Item[];
  foot?: { href: string; label: string };
}
const { root, items, foot } = Astro.props;

const topIndexes = items.flatMap((it, i) => (it.sub ? [] : [i]));
const lastTop = topIndexes[topIndexes.length - 1];

const glyphs = items.map((it, i) => {
  if (!it.sub) return i === lastTop ? '└── ' : '├── ';
  const parent = topIndexes.filter((t) => t < i).pop();
  const isLastSub = !items[i + 1]?.sub;
  return (parent === lastTop ? '    ' : '│   ') + (isLastSub ? '└── ' : '├── ');
});
---
<aside class="tree" aria-label="Plan du site">
  <div>
    <p class="tree__root">{root}</p>
    <nav aria-label="Sections">
      <ul class="tree__list" id="tree">
        {items.map((it, i) => (
          <li class:list={[it.sub && 'tree__sub']}>
            <a href={it.href} data-target={it.target} data-label={it.label}>
              <span class="tree__glyph" aria-hidden="true">{glyphs[i]}</span>{it.label}
            </a>
          </li>
        ))}
      </ul>
      <span class="tree__marker" id="marker" aria-hidden="true"></span>
    </nav>
  </div>
  {foot && (
    <p class="tree__foot">
      <a href={foot.href}>{foot.label}</a><br />
      <span>PDF · à télécharger</span>
    </p>
  )}
</aside>
```

- [ ] **Step 2: `scroll-spy.ts`**

```ts
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
```

- [ ] **Step 3: `Shell.astro`**

```astro
---
import Layout from './Layout.astro';
import Tree from '../components/Tree.astro';

interface Props {
  title?: string;
  description?: string;
  treeItems: { href: string; label: string; target?: string; sub?: boolean }[];
  cmdNav: { href: string; label: string }[];
  foot?: { href: string; label: string };
  /** libellé initial de la barre d'état, par ex. « README.md » */
  here: string;
}
const { title, description, treeItems, cmdNav, foot, here } = Astro.props;
---
<Layout title={title} description={description}>
  <div class="shell">
    <Tree root="~/alexandre-magnier/" items={treeItems} foot={foot} />
    <main id="contenu">
      <div class="cmdbar">
        <p class="cmdbar__path">alexandre-magnier<span>:</span>~</p>
        <nav aria-label="Sections (mobile)">
          <ul>
            {cmdNav.map((l) => <li><a href={l.href}>{l.label}</a></li>)}
          </ul>
        </nav>
      </div>
      <slot />
    </main>
  </div>
  <div class="status" aria-hidden="true">
    <span class="status__path" id="status-path">~/alexandre-magnier/<span>{here}</span></span>
    <span id="status-pos">haut</span>
  </div>
  <script>
    import '../scripts/scroll-spy.ts';
  </script>
</Layout>
```

- [ ] **Step 4: Vérifier**

Run: `pnpm astro build`
Expected: build sans erreur.

---

### Task 4: Sections Présentation, Expériences, Compétences, Contact

**Files:**
- Create: `src/components/Hero.astro`, `ExperienceLog.astro`, `Skills.astro`, `Contact.astro`

**Ce que vous apprenez :** `src/components/` ; le composant `<Image />` de `astro:assets` (importer l'image, Astro calcule tailles et formats) ; boucler avec `.map()` dans le gabarit.

- [ ] **Step 1: `Hero.astro`**

```astro
---
import { Image } from 'astro:assets';
import photo from '../assets/photo.png';
import { profile } from '../lib/content';

const [first, ...rest] = profile.name.split(' ');
---
<section id="presentation" class="g hero" aria-labelledby="t-name">
  <h1 class="hero__name" id="t-name"><span>{first}</span><span>{rest.join(' ')}</span></h1>

  <figure class="hero__fig">
    <Image src={photo} alt={`Portrait de ${profile.name}`} width={400} height={400} loading="eager" />
    <figcaption>photo.png</figcaption>
  </figure>

  <div class="hero__who">
    <p class="prompt mute" style="margin:0">whoami</p>
    <p class="hero__role">{profile.title}</p>
    <p class="hero__tag">{profile.tagline}</p>
  </div>

  <div class="hero__meta">
    <p><span class="comment">statut</span><br />{profile.availability}</p>
    <p><span class="comment">mobilité</span><br />{profile.mobility}</p>
    <p><span class="comment">joindre</span><br /><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
    <p style="margin:0"><span class="comment">cv</span><br /><a href={profile.cv}>cv-alexandre-magnier.pdf</a></p>
  </div>
</section>
```

- [ ] **Step 2: `ExperienceLog.astro`**

```astro
---
import { experience, education, period, stripPostcode } from '../lib/content';
---
<section id="experiences" class="g sec" aria-labelledby="t-exp">
  <header class="sec__head">
    <p class="sec__cmd prompt">ls -lt experiences/</p>
    <h2 class="sec__title" id="t-exp">experiences<span class="slash">/</span></h2>
  </header>

  <ol class="log" reversed>
    {experience.map((job) => (
      <li class="log__row">
        <p class="log__date" style="margin:0"><b>{job.start}</b>→ {job.end}</p>
        <div>
          <h3 class="log__role">{job.role}</h3>
          {job.project && <p class="log__project">{job.project}</p>}
          <ul style={job.project ? undefined : 'margin-top:.6rem'}>
            {job.bullets.map((b) => <li>{b}</li>)}
          </ul>
        </div>
        <p class="log__where" style="margin:0">
          <b>{job.company}</b>
          <span class="mute">{job.type.toLowerCase()} · {stripPostcode(job.place)}</span>
        </p>
      </li>
    ))}
  </ol>

  <ol class="log" style="margin-top:2rem">
    {education.map((ed) => (
      <li class="log__row">
        <p class="log__date" style="margin:0"><b>{ed.start}</b>→ {ed.end}</p>
        <div>
          <h3 class="log__role">{ed.degree}</h3>
          <p class="log__project">{ed.school} · {stripPostcode(ed.place)}</p>
        </div>
        <p class="log__where" style="margin:0"><b>formation</b></p>
      </li>
    ))}
  </ol>
</section>
```

Note : `period` n'est pas utilisé ici ; ne pas l'importer (retirer de l'import si l'éditeur le signale).

- [ ] **Step 3: `Skills.astro`**

```astro
---
import { skills, yamlKey } from '../lib/content';
---
<section id="competences" class="g sec" aria-labelledby="t-skills">
  <header class="sec__head">
    <p class="sec__cmd prompt">cat competences.yml</p>
    <h2 class="sec__title" id="t-skills">competences<span class="slash">.yml</span></h2>
  </header>

  <div class="file">
    <div class="file__tab"><b>competences.yml</b><span class="mute">yaml · lecture seule</span></div>
    <ol class="code">
      {skills.groups.map((g) => (
        <>
          {g.name === 'Notions' && <li><span class="comment">notions, pas encore de production</span></li>}
          <li><span><span class="k">{yamlKey(g.name)}:</span> {g.items.join(', ')}</span></li>
        </>
      ))}
    </ol>
  </div>

  <div class="aside">
    <div>
      <h3><span class="comment" style="color:var(--ink)">langues</span></h3>
      <ul>
        {skills.languages.map((l) => <li><span>{l.name}</span><span class="mute">{l.level}</span></li>)}
      </ul>
    </div>
    <div>
      <h3><span class="comment" style="color:var(--ink)">savoir-être</span></h3>
      <ul>
        {skills.softSkills.map((s) => <li>{s}</li>)}
      </ul>
    </div>
  </div>
</section>
```

- [ ] **Step 4: `Contact.astro`**

```astro
---
import { profile } from '../lib/content';

const bare = (url: string) => url.replace(/^https?:\/\//, '');
const tel = `tel:+33${profile.phone.replace(/\s/g, '').replace(/^0/, '')}`;
---
<section id="contact" class="g sec" aria-labelledby="t-contact">
  <header class="sec__head">
    <p class="sec__cmd prompt">contact --all</p>
    <h2 class="sec__title" id="t-contact">contact</h2>
  </header>

  <a class="mail" href={`mailto:${profile.email}`}>{profile.email}</a>

  <dl class="reach">
    <dt>téléphone</dt><dd><a href={tel}>{profile.phone}</a></dd>
    <dt>github</dt><dd><a href={profile.github}>{bare(profile.github)}</a></dd>
    <dt>linkedin</dt><dd><a href={profile.linkedin}>{bare(profile.linkedin)}</a></dd>
    <dt>cv</dt><dd><a href={profile.cv}>cv-alexandre-magnier.pdf</a> <span class="mute">(PDF)</span></dd>
  </dl>

  <p class="eof">— EOF —</p>
</section>
```

- [ ] **Step 5: Vérifier**

Run: `pnpm astro build`
Expected: build sans erreur.

---

### Task 5: Projets (emplacements d'images, mis en avant, lignes)

**Files:**
- Create: `src/components/ImageSlot.astro`, `ProjectFeatured.astro`, `ProjectRow.astro`, `ProjectsSection.astro`

**Ce que vous apprenez :** lire une collection avec `getCollection` ; `entry.id` (identifiant issu du nom de fichier) ; `class:list` ; images optionnelles et pourquoi le schéma garde `cover` facultatif.

- [ ] **Step 1: `ImageSlot.astro`**

```astro
---
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';

interface Props {
  src?: ImageMetadata;
  alt: string;
  /** dossier du projet, affiché dans la légende : <slug>/cover.png */
  slug: string;
  file?: string;
}
const { src, alt, slug, file = 'cover.png' } = Astro.props;
---
<figure class:list={['p__shot', !src && 'p__shot--empty']}>
  {src ? (
    <Image src={src} alt={alt} loading="lazy" widths={[480, 800, 1200]} sizes="(max-width: 900px) 100vw, 60vw" />
  ) : (
    <div class="p__slot" role="img" aria-label={`Capture à venir : ${alt}`}>
      <span class="comment">capture à venir</span>
    </div>
  )}
  <figcaption><span>{slug}/{file}</span><span>{src ? '' : 'emplacement réservé'}</span></figcaption>
</figure>
```

- [ ] **Step 2: `ProjectFeatured.astro`**

```astro
---
import { displayStack, type Project } from '../lib/content';
import ImageSlot from './ImageSlot.astro';

interface Props { project: Project; index: number }
const { project, index } = Astro.props;
const { id, data } = project;
const stack = displayStack(data.stack);
---
<article class:list={['pf', index % 2 === 1 && 'pf--flip']} id={`p-${id}`} aria-labelledby={`t-${id}`}>
  <div class="pf__text">
    <p class="p__path">projets/{id}/</p>
    <h3 class="p__title" id={`t-${id}`}><a href={`/projets/${id}/`}>{data.title}</a></h3>
    <p class="p__sum">{data.summary}</p>
    <dl class="p__kv">
      {data.frame && <><dt>cadre</dt><dd>{data.frame}</dd></>}
      {stack.length > 0 && <><dt>stack</dt><dd>{stack.join(' / ')}</dd></>}
      {data.status === 'a-completer' && <><dt>état</dt><dd class="pending">détails à venir</dd></>}
    </dl>
  </div>
  <div class="pf__shot">
    <ImageSlot src={data.cover} alt={data.coverAlt ?? `Capture du projet ${data.title}`} slug={id} />
  </div>
</article>
```

- [ ] **Step 3: `ProjectRow.astro`**

```astro
---
import { displayStack, type Project } from '../lib/content';

interface Props { project: Project }
const { id, data } = Astro.props.project;
---
<li class="row" id={`p-${id}`}>
  <a class="row__link" href={`/projets/${id}/`}>
    <span class="row__path">projets/{id}/</span>
    <span class="row__title">{data.title}</span>
    <span class="row__meta">{data.frame ?? ''}</span>
    <span class="row__stack">{displayStack(data.stack).join(' / ')}</span>
  </a>
</li>
```

- [ ] **Step 4: `ProjectsSection.astro`**

```astro
---
import { getProjects } from '../lib/content';
import ProjectFeatured from './ProjectFeatured.astro';
import ProjectRow from './ProjectRow.astro';

const projects = await getProjects();
const featured = projects.filter((p) => p.data.featured);
const others = projects.filter((p) => !p.data.featured);
---
<section id="projets" class="g sec proj" aria-labelledby="t-proj">
  <header class="sec__head" style="margin-bottom:0">
    <p class="sec__cmd prompt">ls projets/ --featured</p>
    <h2 class="sec__title" id="t-proj">projets<span class="slash">/</span></h2>
  </header>

  {featured.map((project, i) => <ProjectFeatured project={project} index={i} />)}

  {others.length > 0 && (
    <>
      <p class="sec__cmd prompt proj__sub">ls -l projets/ --autres</p>
      <ol class="rows">
        {others.map((project) => <ProjectRow project={project} />)}
      </ol>
    </>
  )}
</section>
```

- [ ] **Step 5: Vérifier**

Run: `pnpm astro build`
Expected: build sans erreur.

---

### Task 6: Pages (accueil, projet, 404)

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/pages/projets/[slug].astro`, `src/pages/404.astro`

**Ce que vous apprenez :** `src/pages/` et le routage par fichiers ; une route dynamique `[slug].astro` avec `getStaticPaths()` (Astro génère une page HTML par projet au build) ; `render()` pour transformer le Markdown en composant `<Content />`.

- [ ] **Step 1: Accueil**

`src/pages/index.astro` :

```astro
---
import Shell from '../layouts/Shell.astro';
import Hero from '../components/Hero.astro';
import ExperienceLog from '../components/ExperienceLog.astro';
import ProjectsSection from '../components/ProjectsSection.astro';
import Skills from '../components/Skills.astro';
import Contact from '../components/Contact.astro';
import { getProjects, profile } from '../lib/content';

const projects = await getProjects();
const treeItems = [
  { href: '#presentation', label: 'README.md', target: 'presentation' },
  { href: '#experiences', label: 'experiences/', target: 'experiences' },
  { href: '#projets', label: 'projets/', target: 'projets' },
  ...projects.map((p) => ({ href: `#p-${p.id}`, label: p.id, sub: true })),
  { href: '#competences', label: 'competences.yml', target: 'competences' },
  { href: '#contact', label: 'contact', target: 'contact' },
];
const cmdNav = [
  { href: '#experiences', label: 'experiences/' },
  { href: '#projets', label: 'projets/' },
  { href: '#competences', label: 'competences.yml' },
  { href: '#contact', label: 'contact' },
];
---
<Shell
  treeItems={treeItems}
  cmdNav={cmdNav}
  foot={{ href: profile.cv, label: 'cv-alexandre-magnier.pdf' }}
  here="README.md"
>
  <Hero />
  <ExperienceLog />
  <ProjectsSection />
  <Skills />
  <Contact />
</Shell>
```

- [ ] **Step 2: Page projet**

`src/pages/projets/[slug].astro` :

```astro
---
import { render } from 'astro:content';
import Shell from '../../layouts/Shell.astro';
import ImageSlot from '../../components/ImageSlot.astro';
import { getProjects, displayStack, profile } from '../../lib/content';

export async function getStaticPaths() {
  const projects = await getProjects();
  return projects.map((project, i) => ({
    params: { slug: project.id },
    props: { project, prev: projects[i - 1], next: projects[i + 1] },
  }));
}

const { project, prev, next } = Astro.props;
const { id, data } = project;
const { Content } = await render(project);
const stack = displayStack(data.stack);
const alt = data.coverAlt ?? `Capture du projet ${data.title}`;
const shots = data.screenshots;

const treeItems = [
  { href: '/', label: '../ accueil' },
  { href: '#readme', label: 'README.md', target: 'readme' },
  { href: '#captures', label: 'captures/', target: 'captures' },
];
const cmdNav = [{ href: '/#projets', label: '← projets/' }];
---
<Shell
  title={`${data.title} — Alexandre Magnier`}
  description={data.summary}
  treeItems={treeItems}
  cmdNav={cmdNav}
  foot={{ href: profile.cv, label: 'cv-alexandre-magnier.pdf' }}
  here="README.md"
>
  <section id="readme" class="g hero" aria-labelledby="t-project">
    <header class="sec__head">
      <p class="sec__cmd prompt">cat projets/{id}/README.md</p>
      <h1 class="sec__title" id="t-project">{data.title}</h1>
    </header>

    <div class="md">
      <p class="p__sum">{data.summary}</p>
      <dl class="p__kv" style="margin-bottom:1.5rem">
        {data.frame && <><dt>cadre</dt><dd>{data.frame}</dd></>}
        {stack.length > 0 && <><dt>stack</dt><dd>{stack.join(' / ')}</dd></>}
        {data.status === 'a-completer' && <><dt>état</dt><dd class="pending">détails à venir</dd></>}
        {data.links.repo && <><dt>code</dt><dd><a href={data.links.repo}>{data.links.repo}</a></dd></>}
        {data.links.live && <><dt>démo</dt><dd><a href={data.links.live}>{data.links.live}</a></dd></>}
      </dl>
      <Content />
    </div>
  </section>

  <section id="captures" class="g sec" aria-labelledby="t-shots">
    <header class="sec__head">
      <p class="sec__cmd prompt">ls projets/{id}/captures/</p>
      <h2 class="sec__title" id="t-shots">captures<span class="slash">/</span></h2>
    </header>
    <div class="gallery">
      <ImageSlot src={data.cover} alt={alt} slug={id} />
      {shots.map((shot, i) => (
        <ImageSlot src={shot} alt={`${alt} (${i + 2})`} slug={id} file={`shot-${i + 1}.png`} />
      ))}
    </div>
  </section>

  <section class="g sec" aria-label="Projets voisins">
    <nav class="pager">
      {prev ? <a href={`/projets/${prev.id}/`}>← {prev.id}</a> : <span></span>}
      <a href="/#projets">projets/</a>
      {next ? <a href={`/projets/${next.id}/`}>{next.id} →</a> : <span></span>}
    </nav>
  </section>
</Shell>
```

- [ ] **Step 3: 404**

`src/pages/404.astro` :

```astro
---
import Shell from '../layouts/Shell.astro';
---
<Shell
  title="Introuvable — Alexandre Magnier"
  treeItems={[{ href: '/', label: '../ accueil' }]}
  cmdNav={[{ href: '/', label: '← accueil' }]}
  here="404"
>
  <section class="g hero">
    <p class="prompt mute" style="grid-column:1/-1;margin:0">cd cette-page</p>
    <h1 class="sec__title" style="grid-column:1/-1">command not found<span class="slash">.</span></h1>
    <p style="grid-column:1/-1"><a href="/">Retour à l'accueil</a></p>
  </section>
</Shell>
```

- [ ] **Step 4: Vérifier**

Run: `pnpm astro build`
Expected: build sans erreur, avec `/index.html`, `/404.html` et 11 pages `/projets/<slug>/index.html` dans la sortie. Vérifier : `ls dist/projets | wc -l` → `11` (ou le nombre de projets conservés).

---

### Task 7: Revue anti-« look IA », contraste, responsive, nettoyage

**Files:**
- Create: `scratch/` (temporaire, supprimé à la fin)
- Delete: assets non référencés

**Ce que vous apprenez :** `astro preview` (sert le site construit, comme en production) face à `astro dev` (serveur de développement avec rechargement) ; `dist/` (la sortie du build).

- [ ] **Step 1: Contrôle de contraste des jetons**

`scratch/contrast.mjs` :

```js
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const L = (h) => { const [r, g, b] = hex(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [x, y] = [L(a), L(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

const pairs = [
  ['texte', '#112343', '#F1F4F8', 4.5],
  ['gris', '#4A5A75', '#F1F4F8', 4.5],
  ['accent', '#2457D6', '#F1F4F8', 4.5],
  ['numéros de ligne', '#5F6E88', '#F1F4F8', 4.5],
  ['accent sur barre', '#8FB0FF', '#112343', 4.5],
  ['papier sur barre', '#F1F4F8', '#112343', 4.5],
];
let bad = 0;
for (const [name, fg, bg, min] of pairs) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) bad++;
  console.log(`${ok ? 'OK ' : 'KO '} ${name}: ${r.toFixed(2)}:1 (min ${min})`);
}
process.exit(bad ? 1 : 0);
```

Run: `node scratch/contrast.mjs`
Expected: toutes les lignes `OK`. Pour toute ligne `KO`, assombrir la couleur fautive dans `:root` de `global.css`, puis relancer.

- [ ] **Step 2: Build, aperçu et captures**

```bash
pnpm astro build
astro preview --background    # ou : pnpm astro preview (adresse affichée dans la sortie)
```

Prendre des captures avec Edge headless (`msedge.exe --headless --disable-gpu --hide-scrollbars --window-size=1440,3600 --virtual-time-budget=4000 --screenshot=<fichier> <url>`) de `/` et d'une page projet (ex. `/projets/sonde/`) à 1440 px. Pour 360 px et 768 px, Edge sans interface ne descend pas sous ~500 px : charger la page dans un `<iframe width="360">` d'une page `scratch/frame.html` et capturer cette page. Utiliser des noms de fichiers uniques (`ctl-impl-…`) : le dossier temporaire est partagé entre agents.

Contrôler visuellement : aucun débordement horizontal, images présentes, emplacements « capture à venir » visibles pour les projets sans cover, arborescence masquée sous 900 px et remplacée par la barre de liens.

- [ ] **Step 3: Comparaison avec la maquette**

Comparer la capture 1440 px de l'accueil à `design-explorations/terminal/index.html` : hiérarchie typographique, grille, filets, marqueur de l'arborescence. Seules différences attendues : palette bleue, projets en plus, emplacements d'images, statut « En recherche de poste ».

- [ ] **Step 4: Relecture anti-« look IA » par un agent**

Lancer un agent `general-purpose` (modèle le plus capable) avec ce prompt :

```text
Relis le site Astro de C:\Users\alexm\Documents\dev\perso\mywebsite SANS le modifier : src/components, src/layouts, src/pages, src/styles/global.css, et les captures fournies. Vérifie la liste d'interdits de design-explorations/BRIEF.md (dégradés violet/bleu, verre dépoli, grille de cartes identiques, icônes/emojis de remplissage, hero générique, polices par défaut, textes creux, fausses fenêtres macOS). Vérifie aussi : aucun texte affiché ne contredit le CV (C:\Users\alexm\Desktop\CV-Alexandre Magnier.pdf) ; ni âge, ni ville de résidence, ni « Hauts-de-France », ni « À préciser », ni années provisoires de projets d'école affichés ; aucune formulation laissant entendre qu'Alexandre est actuellement en alternance ; accessibilité de base (alt, focus visible, titres hiérarchisés, prefers-reduced-motion). Rapport : liste numérotée de violations avec fichier:ligne, ou « aucune ».
```

Corriger chaque violation, puis relancer le build.

- [ ] **Step 5: Nettoyage des assets**

Pour chaque fichier de `src/assets/`, vérifier qu'il est référencé :

```bash
grep -rn "logos/" src --include=*.astro --include=*.ts --include=*.md | head
```

Supprimer ce qui n'est référencé nulle part (attendu : `src/assets/logos/` entier, et les trois `shot-1.png` doublons de `airbnb`, `echoes`, `spotify`). Lister à Alexandre ce qui a été supprimé ; les sources restent dans `../portfolio/img`. Supprimer `scratch/`.

- [ ] **Step 6: Arrêt du serveur et build final**

```bash
astro dev stop 2>/dev/null; astro preview stop 2>/dev/null
pnpm astro build
```

Expected: build sans erreur.

---

### Task 8: Documentation finale

**Files:**
- Modify: `docs/guide-astro.md`, `CLAUDE.md` (et `AGENTS.md`, même fichier)

- [ ] **Step 1: Compléter `docs/guide-astro.md`**

Ajouter une section « Où se trouve quoi dans ce site » : un tableau fichier → rôle pour les fichiers de la section « Structure des fichiers » ci-dessus, une section « Comment ajouter une capture à un projet » (déposer l'image dans `src/assets/projects/<slug>/cover.png`, ajouter la ligne `cover: ../../assets/projects/<slug>/cover.png` dans `src/content/projects/<slug>.md`, ajouter `coverAlt: "description de l'image"` ; les captures supplémentaires vont dans `screenshots:`), et une section « Comment ajouter un projet » (créer `src/content/projects/<slug>.md` avec le frontmatter du schéma, qui est la liste de champs de `src/content.config.ts`).

- [ ] **Step 2: Mettre à jour `CLAUDE.md`**

Dans la section « Projet », ajouter les commandes réelles et la structure : `pnpm dev` / `astro dev --background`, `pnpm build`, `pnpm preview` ; pages `index.astro` et `projets/[slug].astro` ; composants par section ; tout le CSS est dans `src/styles/global.css` (choix assumé pour un site de cette taille).

- [ ] **Step 3: Vérifier**

Run: `diff CLAUDE.md AGENTS.md && echo identiques`
Expected: `identiques`.

---

## Auto-revue

- **Spec :** direction terminal (Tasks 1, 3-6), palette bleue de la photo (Task 1, jetons ; contraste Task 7), tous les projets avec emplacements (Task 5), pages `/projets/[slug]` (Task 6), « en recherche de poste » (Task 2 `availability`, Task 4 Hero), non-affichage âge/ville/« Hauts-de-France »/valeurs provisoires (Task 2 helpers, Task 4, vérifié Task 7), responsive et accessibilité (Task 7), nettoyage des assets (Task 7), CLAUDE.md et guide Astro (Task 8).
- **Cohérence :** `getProjects`, `displayStack`, `stripPostcode`, `yamlKey`, `profile`, `experience`, `education`, `skills` définis en Task 2 et utilisés tels quels ensuite ; `frame`, `coverAlt` ajoutés au schéma en Task 2 avant usage en Tasks 5-6 ; classes CSS `pf`, `rows`, `row__*`, `md`, `gallery`, `pager`, `p__slot` définies en Task 1 Step 3 avant usage.
- **Points ouverts, non bloquants :** Martian Mono est chargée depuis Google Fonts (pas d'hébergement local) ; `package-lock.json` est un doublon de `pnpm-lock.yaml` et peut être supprimé sur décision d'Alexandre ; la décision sur les projets d'école à retirer s'applique avant la Task 2 Step 2.

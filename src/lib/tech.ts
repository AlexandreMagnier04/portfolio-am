import type { ImageMetadata } from 'astro';

// Tous les logos de src/assets/tech/*.svg, importés au build.
// Pour ajouter une techno : déposer <nom>.svg dans ce dossier, en minuscules et sans espace
// (« Tailwind CSS » → tailwindcss.svg). Une techno sans logo s'affiche en texte seul.
const modules = import.meta.glob<{ default: ImageMetadata }>('../assets/tech/*.svg', { eager: true });

const normalize = (name: string): string => name.toLowerCase().replace(/[^a-z0-9]/g, '');

const icons = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(modules)) {
  const file = path.split('/').pop()!.replace(/\.svg$/, '');
  icons.set(file, mod.default);
}

export const techIcon = (name: string): ImageMetadata | undefined => icons.get(normalize(name));

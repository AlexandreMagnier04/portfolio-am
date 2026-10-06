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

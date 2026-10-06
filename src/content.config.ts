import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      year: z.number().int(),
      context: z.enum(['entreprise', 'ecole', 'personnel']),
      status: z.enum(['complet', 'a-completer']).default('complet'),
      featured: z.boolean().default(false),
      order: z.number().int().default(100),
      stack: z.array(z.string()).min(1),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      coverCaption: z.string().optional(),
      screenshotAlts: z.array(z.string()).default([]),
      screenshotCaptions: z.array(z.string()).default([]),
      frame: z.string().optional(),
      figures: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      screenshots: z.array(image()).default([]),
      links: z
        .object({ repo: z.string().url().optional(), live: z.string().regex(/^(https?:\/\/|\/)/, 'adresse complète (https://…) ou chemin du site (/demos/…)').optional() })
        .default({}),
    }),
});

export const collections = { projects };

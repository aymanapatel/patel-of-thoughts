import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        updated: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        heroImage: z.string().optional(),
        cover: z.string().optional(),
        ogImage: z.string().optional(),
        showcase: z.boolean().default(false),
    }),
});

const projects = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        updated: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        heroImage: z.string().optional(),
        cover: z.string().optional(),
        ogImage: z.string().optional(),
        github: z.string().url().optional(),
        live: z.string().url().optional(),
        showcase: z.boolean().default(false),
        current: z.boolean().default(false),
        role: z.string().optional(),
        stack: z.array(z.string()).default([]),
        highlights: z.array(z.string()).default([]),
    }),
});

export const collections = { posts, projects };

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
    integrations: [
        mdx(),
        react()
    ],
    markdown: {
        syntaxHighlight: 'shiki',
        shikiConfig: {
            theme: 'github-dark',
        },
        remarkPlugins: [remarkReadingTime],
    },
    output: 'static',
});

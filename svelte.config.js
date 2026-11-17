import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';

// The kb renders as a static site. BASE_PATH is set when it is published under a sub-path (GitHub Pages).
const base = process.env.BASE_PATH ?? '';

export default {
  extensions: ['.svelte', '.svx'],
  preprocess: [vitePreprocess(), mdsvex({ extensions: ['.svx'], layout: { runbook: fileURLToPath(new URL('./src/lib/layouts/runbook.svelte', import.meta.url)) } })],
  kit: {
    adapter: adapter({ pages: 'build', assets: 'build', fallback: undefined }),
    alias: { '#lib': 'src/lib' },
    paths: { base, relative: false },
    prerender: { handleHttpError: 'warn', handleMissingId: 'ignore', entries: ['*', '/', '/kb'] },
  },
};

import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    site: 'https://www.thebigbangcollective.com/',
    integrations: [tailwind(), mdx()],
    // Prefetch internal pages as their links scroll into view, so clicking feels instant
    prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
    // Inline CSS so the first paint doesn't wait on extra stylesheet requests
    build: { inlineStylesheets: 'always' },
});

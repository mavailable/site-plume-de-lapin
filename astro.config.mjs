import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://plumedelapin.fr',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/merci') &&
        !page.includes('/404') &&
        !page.includes('/admin'),
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR' } },
    }),
    react(),
  ],
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
  vite: {
    plugins: [tailwindcss()],
    build: { cssMinify: true },
  },
});

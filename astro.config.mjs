import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const isKeystatic = process.env.KEYSTATIC === 'true';

const keystatic = isKeystatic ? (await import('@keystatic/astro')).default : null;
const cloudflare = isKeystatic ? (await import('@astrojs/cloudflare')).default : null;

export default defineConfig({
  site: 'https://plumedelapin.fr',
  output: isKeystatic ? 'hybrid' : 'static',
  adapter: isKeystatic ? cloudflare() : undefined,
  integrations: [
    sitemap({ i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR' } } }),
    react(),
    ...(isKeystatic && keystatic ? [keystatic()] : []),
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
    build: { cssMinify: true },
  },
});

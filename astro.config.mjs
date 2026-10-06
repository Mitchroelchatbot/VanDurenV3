import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeKopId from './src/lib/rehype-kop-id.mjs';

export default defineConfig({
  site: 'https://indoorpadelcentrum.nl',
  trailingSlash: 'never',
  integrations: [
    // /bedankt is de bevestigingspagina na een formulier: niet in de sitemap
    // en noindex (B7, 6 oktober 2026).
    sitemap({ filter: (pagina) => !/\/bedankt\/?$/.test(pagina) }),
  ],
  markdown: { rehypePlugins: [rehypeKopId] },
  build: { inlineStylesheets: 'auto' },
});

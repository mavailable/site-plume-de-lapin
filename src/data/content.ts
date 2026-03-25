import fs from 'node:fs';
import path from 'node:path';

function readJson<T>(filePath: string): T {
  const fullPath = path.join(process.cwd(), filePath);
  return JSON.parse(fs.readFileSync(fullPath, 'utf-8')) as T;
}

function readCollection<T>(dirPath: string): (T & { slug: string })[] {
  const fullDir = path.join(process.cwd(), dirPath);
  if (!fs.existsSync(fullDir)) return [];
  return fs.readdirSync(fullDir)
    .filter(f => f.endsWith('.json'))
    .map(f => ({
      slug: f.replace('.json', ''),
      ...readJson<T>(path.join(dirPath, f)),
    }));
}

// Types
export type SiteInfo = {
  name: string;
  phone: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  openingHours: string;
};

export type Hero = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  reassurance: string;
};

export type About = {
  directorName: string;
  tagline: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  paragraph4: string;
  paragraph5: string;
  paragraph6: string;
};

export type Service = {
  title: string;
  shortDesc: string;
  description: string;
  image: string;
  order: number;
};

export type Testimonial = {
  name: string;
  context: string;
  quote: string;
  order: number;
};

export type FaqItem = {
  question: string;
  answer: string;
  order: number;
};

export type Product = {
  nom: string;
  photo: string;
  prix: number;
  categorie: string;
  description: string;
  disponible: boolean;
  ordre: number;
};

// Singletons
export function getSiteInfo() { return readJson<SiteInfo>('src/content/site-info/index.json'); }
export function getHero() { return readJson<Hero>('src/content/hero/index.json'); }
export function getAbout() { return readJson<About>('src/content/about/index.json'); }

// Collections
export function getServices() {
  return readCollection<Service>('src/content/services').sort((a, b) => a.order - b.order);
}

export function getTestimonials() {
  return readCollection<Testimonial>('src/content/testimonials').sort((a, b) => a.order - b.order);
}

export function getFaq() {
  return readCollection<FaqItem>('src/content/faq').sort((a, b) => a.order - b.order);
}

export function getProducts() {
  return readCollection<Product>('src/content/produits').sort((a, b) => a.ordre - b.ordre);
}

export function getProductBySlug(slug: string) {
  const products = getProducts();
  return products.find(p => p.slug === slug);
}

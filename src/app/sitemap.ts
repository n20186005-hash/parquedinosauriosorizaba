import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://parquedinosauriosorizaba.com';
  const locales = ['zh', 'en', 'es'];

  const routes = [
    '',
    '/precios-horarios',
    '/como-llegar',
    '/fotos',
    '/visitar-con-ninos',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-settings',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route.startsWith('/precios') || route === '/como-llegar' ? 0.8 : 0.5,
      });
    }
  }

  return sitemap;
}

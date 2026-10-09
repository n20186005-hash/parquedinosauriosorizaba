import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SITE } from '@/lib/site-config';
import { routing, type Locale } from '@/i18n/routing';
import { topicMeta } from '@/lib/topics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicPage from '@/components/TopicPage';
import Gallery from '@/components/Gallery';

const SLUG = 'fotos' as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function resolveLocale(locale: string): Locale {
  return (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const meta = topicMeta[SLUG][locale];
  const baseUrl = SITE.baseUrl;
  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/${SLUG}`,
      languages: {
        es: `${baseUrl}/es/${SLUG}`,
        en: `${baseUrl}/en/${SLUG}`,
        zh: `${baseUrl}/zh/${SLUG}`,
        'x-default': `${baseUrl}/es/${SLUG}`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}/${SLUG}`,
      siteName: SITE.fullName,
      locale: locale === 'es' ? 'es_MX' : locale === 'en' ? 'en_US' : 'zh_CN',
      type: 'website',
      images: [
        { url: SITE.heroImageUrl, width: 1024, height: 768, alt: SITE.fullName },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
  return (
    <>
      <Header />
      <TopicPage slug={SLUG} locale={locale}>
        <Gallery />
      </TopicPage>
      <Footer />
    </>
  );
}

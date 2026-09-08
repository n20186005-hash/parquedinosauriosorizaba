import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { SITE } from '@/lib/site-config';
import PwaRegister from '@/components/PwaRegister';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const baseUrl = SITE.baseUrl;

  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const esUrl = `${baseUrl}/es`;

  let selfUrl = zhUrl;
  if (locale === 'en') selfUrl = enUrl;
  else if (locale === 'es') selfUrl = esUrl;

  const localeMap: Record<string, string> = {
    'zh': 'zh_CN',
    'en': 'en_US',
    'es': 'es_MX',
  };

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'es': esUrl,
        'x-default': esUrl,
      } as Record<string, string>,
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: SITE.fullName,
      locale: localeMap[locale] || 'zh_CN',
      type: 'website',
      images: [
        {
          url: SITE.heroImageUrl,
          width: 1024,
          height: 768,
          alt: `${SITE.fullName} in ${SITE.city}, ${SITE.country}`,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const langMap: Record<string, string> = {
    'zh': 'zh-CN',
    'en': 'en',
    'es': 'es',
  };

  // ============ Schema.org 结构化数据 ============
  // 1) TouristAttraction：地理实体 + 坐标 + 图片 + @id（英语，面向知识图谱）
  const touristAttractionSchema = {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'ThemePark'],
    '@id': `${SITE.baseUrl}/#attraction`,
    name: SITE.fullName,
    alternateName: [
      SITE.shortName,
      `${SITE.city} ${SITE.fullName}`,
      SITE.shortNameEn,
    ],
    description: `Comprehensive visitor guide to ${SITE.fullName} in ${SITE.city}, ${SITE.stateProvince}, ${SITE.country}.`,
    url: `${SITE.baseUrl}/es`,
    image: [SITE.heroImageUrl],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE.rating,
      reviewCount: Number(SITE.reviewCount.replace(/[^\d]/g, '')),
      bestRating: '5',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.city,
      addressRegion: SITE.stateProvince,
      postalCode: SITE.postalCode,
      addressCountry: SITE.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.latitude,
      longitude: SITE.longitude,
    },
    hasMap: SITE.mapsShareUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '10:00',
        closes: '22:00',
      },
    ],
    sameAs: [
      SITE.mapsShareUrl,
      SITE.tourismUrl,
      SITE.tourismParkPageUrl,
    ],
  };

  return (
    <html lang={langMap[locale] || 'zh-CN'} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#1b4332" />
        <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link
          rel="preload"
          as="image"
          href="/gallery/expo-parque-de-los-dinosaurios-orizaba-1.jpg"
        />

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />

        {/* ============ GA4（需用户同意统计 Cookie 后才会加载） ============ */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var GA_ID = '${SITE.gaId}';
                var loaded = false;
                function loadAnalytics() {
                  if (loaded) { return; }
                  loaded = true;
                  var s = document.createElement('script');
                  s.async = true;
                  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
                  document.head.appendChild(s);
                  window.dataLayer = window.dataLayer || [];
                  window.gtag = function() { window.dataLayer.push(arguments); };
                  window.gtag('js', new Date());
                  window.gtag('config', GA_ID, { anonymize_ip: true });
                }
                function readConsent() {
                  try {
                    var prefs = JSON.parse(localStorage.getItem('cookiePrefs') || '{}');
                    if (prefs.analytics) {
                      loadAnalytics();
                    } else if (loaded && window.gtag) {
                      window.gtag('consent', 'update', { analytics_storage: 'denied' });
                    }
                  } catch(e) {}
                }
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
                window.addEventListener('analyticsConsentChanged', readConsent);
                readConsent();
              })();
            `,
          }}
        />

        {/* ============ Schema.org JSON-LD ============
             · TouristAttraction/ThemePark 实体标记（全站）
             · FAQPage 仅在首页输出（见 FaqJsonLd 组件），
               避免在隐私政策/条款等无 FAQ 正文的页面出现不匹配的富摘要 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttractionSchema) }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <PwaRegister />
      </body>
    </html>
  );
}

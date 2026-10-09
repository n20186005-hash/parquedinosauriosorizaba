import { SITE } from '@/lib/site-config';
import { topicContent, TOPIC_SLUGS, type TopicSlug } from '@/lib/topics';
import type { Locale } from '@/i18n/routing';
import type { ReactNode } from 'react';

const HOME_LABELS: Record<Locale, string> = {
  es: 'Inicio',
  en: 'Home',
  zh: '首页',
};

export default function TopicPage({
  slug,
  locale,
  children,
}: {
  slug: TopicSlug;
  locale: Locale;
  children?: ReactNode;
}) {
  const content = topicContent[slug][locale];
  const baseUrl = SITE.baseUrl;
  const selfUrl = `${baseUrl}/${locale}/${slug}`;
  const homeUrl = `${baseUrl}/${locale}`;

  // JSON-LD: BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: HOME_LABELS[locale],
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: content.h1,
        item: selfUrl,
      },
    ],
  };

  // JSON-LD: FAQPage (only if the topic has FAQ items)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const otherTopics = TOPIC_SLUGS.filter((s) => s !== slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header / intro */}
      <section
        className="px-4 sm:px-6 pt-28 sm:pt-32 pb-10"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm mb-4" style={{ color: 'var(--text-muted)' }} aria-label="Breadcrumb">
            <a href={homeUrl} className="hover:underline" style={{ color: 'var(--accent)' }}>
              {HOME_LABELS[locale]}
            </a>
            <span className="mx-2">/</span>
            <span>{content.h1}</span>
          </nav>
          <h1
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {content.h1}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {content.intro}
          </p>
        </div>
      </section>

      {/* Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 section-padding">
        {content.sections.map((section) => (
          <section key={section.id} id={section.id} className="mb-10" style={{ scrollMarginTop: '5rem' }}>
            <h2
              className="font-display text-2xl sm:text-3xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {section.title}
            </h2>
            <div className="w-12 h-0.5 mb-5" style={{ background: 'var(--accent)' }} />
            {section.body.map((para, i) => (
              <p
                key={i}
                className="mb-3 leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {para}
              </p>
            ))}
          </section>
        ))}

        {children}

        {/* FAQ */}
        <section id="faq" className="mt-12" style={{ scrollMarginTop: '5rem' }}>
          <h2
            className="font-display text-2xl sm:text-3xl font-semibold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            FAQ
          </h2>
          <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
          <div className="space-y-4">
            {content.faq.map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-5"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <h3 className="font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                  {item.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Other guides */}
        <section className="mt-12">
          <h2
            className="font-display text-xl sm:text-2xl font-semibold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {locale === 'es' ? 'Otras guías' : locale === 'en' ? 'More guides' : '更多指南'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherTopics.map((other) => (
              <a
                key={other}
                href={`/${locale}/${other}`}
                className="rounded-xl p-4 transition-colors hover:opacity-90"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  {topicContent[other][locale].h1}
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

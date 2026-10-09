'use client';

import { useLocale } from 'next-intl';
import { topicContent, TOPIC_SLUGS } from '@/lib/topics';
import type { Locale } from '@/i18n/routing';

const SECTION_LABELS: Record<Locale, string> = {
  es: 'Guías útiles para tu visita',
  en: 'Useful guides for your visit',
  zh: '实用游览指南',
};

export default function TopicLinks() {
  const locale = useLocale() as Locale;

  return (
    <section
      className="section-padding"
      style={{ background: 'var(--bg-secondary)', scrollMarginTop: '5rem' }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {SECTION_LABELS[locale]}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TOPIC_SLUGS.map((slug) => (
            <a
              key={slug}
              href={`/${locale}/${slug}`}
              className="block rounded-2xl p-5 transition-colors hover:opacity-90"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                {topicContent[slug][locale].h1}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

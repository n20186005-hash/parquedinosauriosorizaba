import { useTranslations, useMessages } from 'next-intl';

export default function FaqSection() {
  const t = useTranslations('faq');
  const messages = useMessages() as any;
  const items: { q: string; a: string }[] = messages?.faq?.items || [];

  return (
    <section id="faq" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-3xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-4 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-center mb-8" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-12 mx-auto" style={{ background: 'var(--accent)' }} />

        <div className="space-y-4">
          {items.map((item, i) => (
            <details
              key={i}
              className="rounded-xl overflow-hidden group"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <summary
                className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 sm:px-6 py-4 select-none"
                style={{ color: 'var(--text-primary)' }}
              >
                <h3 className="font-display text-base sm:text-lg font-semibold">{item.q}</h3>
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-200 group-open:rotate-45"
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--accent)' }}
                >
                  +
                </span>
              </summary>
              <p
                className="px-5 sm:px-6 pb-5 text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

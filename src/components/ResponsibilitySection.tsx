import { useTranslations, useMessages } from 'next-intl';

export default function ResponsibilitySection() {
  const t = useTranslations('responsibility');
  const messages = useMessages() as any;
  const items: string[] = messages?.responsibility?.items || [];

  return (
    <section id="responsibility" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-3xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-3 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-center mb-6 max-w-2xl mx-auto text-base" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10 mx-auto" style={{ background: 'var(--accent)' }} />

        <ul
          className="rounded-2xl p-6 sm:p-8 space-y-4"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed">
              <span
                className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white"
                style={{ background: 'var(--accent)' }}
                aria-hidden="true"
              >
                ✓
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

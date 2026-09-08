import { useTranslations, useMessages } from 'next-intl';

export default function ScienceSection() {
  const t = useTranslations('science');
  const messages = useMessages() as any;
  const items: { title: string; content: string }[] = messages?.science?.items || [];

  return (
    <section id="science" className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-3 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-center mb-6 max-w-3xl mx-auto text-base" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10 mx-auto" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col gap-3"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <h3 className="font-display text-base font-semibold flex items-start gap-2" style={{ color: 'var(--text-primary)' }}>
                <span aria-hidden="true">🦕</span>
                <span>{item.title}</span>
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

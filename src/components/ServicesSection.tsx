import { useTranslations, useMessages } from 'next-intl';

const ICONS = ['🚻', '🅿️', '🍽️', '🛏️', '🏪', '⛽'];

export default function ServicesSection() {
  const t = useTranslations('services');
  const messages = useMessages() as any;
  const items: { name: string; desc: string }[] = messages?.services?.items || [];

  return (
    <section id="services" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col gap-3"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <span className="text-2xl" aria-hidden="true">{ICONS[i % ICONS.length]}</span>
              <h3 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                {item.name}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

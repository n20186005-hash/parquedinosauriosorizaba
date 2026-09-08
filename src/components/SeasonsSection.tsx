import { useTranslations, useMessages } from 'next-intl';

export default function SeasonsSection() {
  const t = useTranslations('seasons');
  const messages = useMessages() as any;
  const items: {
    season: string;
    weather: string;
    crowd: string;
    tip: string;
  }[] = messages?.seasons?.items || [];

  return (
    <section id="seasons" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 sm:p-7 flex flex-col gap-4"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <h3 className="flex items-center gap-3 font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                <span
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  {['❄️', '🌸', '⛈️', '🍁'][i] || i + 1}
                </span>
                {item.season}
              </h3>
              <div className="space-y-3 text-sm leading-relaxed">
                <p style={{ color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{t('fieldWeather')}：</strong>
                  {item.weather}
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{t('fieldCrowd')}：</strong>
                  {item.crowd}
                </p>
              </div>
              <p
                className="rounded-xl px-4 py-3 text-sm leading-relaxed"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', borderLeft: '3px solid var(--accent)' }}
              >
                <strong style={{ color: 'var(--text-primary)' }}>{t('fieldTip')}：</strong>
                {item.tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

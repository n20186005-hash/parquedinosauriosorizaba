import { useTranslations, useMessages } from 'next-intl';

export default function LandmarksSection() {
  const t = useTranslations('landmarks');
  const messages = useMessages() as any;
  const items: { name: string; desc: string; url: string }[] =
    messages?.landmarks?.items || [];

  return (
    <section id="landmarks" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6 mx-auto" style={{ background: 'var(--accent)' }} />

        <p
          className="text-center text-lg leading-relaxed max-w-3xl mx-auto mb-12"
          style={{ color: 'var(--text-secondary)' }}
          dangerouslySetInnerHTML={{
            __html: t('intro').replace(
              /\*\*(.*?)\*\*/g,
              '<strong style="color: var(--text-primary)">$1</strong>'
            ),
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl p-6 transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <h3
                className="font-display text-lg font-semibold mb-2 flex items-start gap-2"
                style={{ color: 'var(--text-primary)' }}
              >
                <span
                  className="mt-1 flex-shrink-0 w-2 h-2 rounded-full"
                  style={{ background: 'var(--accent)' }}
                />
                {item.name}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                {item.desc}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--accent)' }}>
                {t('viewMaps')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

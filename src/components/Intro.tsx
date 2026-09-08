import { useTranslations, useMessages } from 'next-intl';

export default function Intro() {
  const t = useTranslations('intro');
  const tOff = useTranslations('footer');
  const messages = useMessages() as any;
  const items: string[] = messages?.intro?.visitGuide?.items || [];
  const alsoKnownAsItems: string[] = messages?.intro?.alsoKnownAs?.items || [];
  const locationChain: { label: string; url?: string }[] =
    messages?.intro?.locationChain || [];

  // 将正文文案中的 **加粗** 转为 <strong>，用于实体语义高亮
  const boldText = (text: string) =>
    text.replace(
      /\*\*(.*?)\*\*/g,
      '<strong style="color: var(--text-primary)">$1</strong>'
    );

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        {/* 地理归属层级（面包屑）：全称 → 城市 → 州 → 国家 */}
        <nav aria-label="Breadcrumb" className="mb-3 text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {locationChain.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>›</span>
                )}
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: 'var(--accent)' }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        {/* 首段等位声明：将短名/域名含义与官方全称做语义等同 */}
        <p
          className="text-lg leading-relaxed mb-4"
          style={{ color: 'var(--text-secondary)' }}
          dangerouslySetInnerHTML={{ __html: boldText(t('lead')) }}
        />

        <p
          className="text-lg leading-relaxed mb-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('description')}
        </p>

        {/* 周边语义集群声明 */}
        <p
          className="text-base leading-relaxed mb-12 rounded-xl p-5"
          style={{
            background: 'var(--bg-tertiary)',
            borderLeft: '4px solid var(--accent)',
            color: 'var(--text-secondary)',
          }}
          dangerouslySetInnerHTML={{ __html: boldText(t('landmarkCluster')) }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('visitGuide.title')}
            </h3>
            <ul className="space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('alsoKnownAs.title')}
            </h3>
            <ul className="space-y-3">
              {alsoKnownAsItems.map((keyword, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{keyword}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 p-6 sm:p-8 rounded-xl border border-[var(--accent)]" style={{ background: 'var(--bg-tertiary)' }}>
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            {tOff('officialManagement.title')}
          </h2>
          <div className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
            {tOff('officialManagement.text')}
          </div>
        </div>
      </div>
    </section>
  );
}

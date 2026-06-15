'use client';

import { useTranslations } from 'next-intl';

export default function TicketsSection() {
  const t = useTranslations('tickets');

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Outdoor Free */}
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)', border: '2px solid var(--accent)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12l2 2 4-4"/>
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t('adultsLabel')}
                </h3>
                <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{t('adultsPriceValue')}</p>
              </div>
            </div>
          </div>

          {/* Lighthouse */}
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 2L8 22h8L12 2z"/>
                  <circle cx="12" cy="8" r="3"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {t('childrenLabel')}
              </h3>
            </div>
            <div className="space-y-3">
              <PriceRow label={t('studentsLabel')} value={t('studentsPriceValue')} />
              <PriceRow label={t('groupsLabel')} value={t('groupsPriceValue')} />
              <PriceRow label={t('tipsLabel')} value={t('tipsPriceValue')} isFree />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceRow({ label, value, isFree = false }: { label: string; value: string; isFree?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <span className="font-semibold" style={{ color: isFree ? 'var(--accent)' : 'var(--text-primary)' }}>
        {value}
      </span>
    </div>
  );
}

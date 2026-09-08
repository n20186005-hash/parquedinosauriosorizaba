import { useTranslations, useMessages } from 'next-intl';

export default function TripPlanSection() {
  const t = useTranslations('tripPlan');
  const messages = useMessages() as any;
  const routeBlock = messages?.tripPlan?.routes;
  const halfDay: string[] = routeBlock?.halfDay?.items || [];
  const fullDay: string[] = routeBlock?.fullDay?.items || [];
  const audience: {
    name: string;
    desc: string;
    note: string;
  }[] = messages?.tripPlan?.audience?.items || [];

  return (
    <section id="trip-plan" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
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

        {/* 通用路线：半日 / 全日 */}
        <h3 className="font-display text-xl font-semibold mb-5 text-center" style={{ color: 'var(--text-primary)' }}>
          {t('routes.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            { title: t('routes.halfDay.label'), items: halfDay, icon: '🌅' },
            { title: t('routes.fullDay.label'), items: fullDay, icon: '🌄' },
          ].map((route) => (
            <div
              key={route.title}
              className="rounded-2xl p-6 sm:p-7"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <h4 className="flex items-center gap-2 font-display text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                <span aria-hidden="true">{route.icon}</span>
                {route.title}
              </h4>
              <ol className="space-y-3">
                {route.items.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span
                      className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: 'var(--accent)' }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* 按人群定制 */}
        <h3 className="font-display text-xl font-semibold mb-5 text-center" style={{ color: 'var(--text-primary)' }}>
          {t('audience.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audience.map((plan, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col gap-3"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg"
                style={{ background: 'var(--bg-secondary)' }}
                aria-hidden="true"
              >
                {['👨‍👩‍👧‍👦', '📷', '♿'][i] || '🧭'}
              </div>
              <h4 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                {plan.name}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {plan.desc}
              </p>
              <p
                className="mt-auto rounded-xl px-4 py-3 text-xs leading-relaxed"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', borderLeft: '3px solid var(--accent)' }}
              >
                {plan.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

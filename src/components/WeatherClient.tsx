'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  fetchWeather,
  codeGroup,
  weatherEmoji,
  buildAdvice,
  umbrellaLevel,
  dateLocale,
  WeatherPayload,
} from '@/lib/weather';

function dayLabel(dateKey: string, locale: string): string {
  const d = new Date(`${dateKey}T12:00:00Z`);
  const fmt = new Intl.DateTimeFormat(dateLocale(locale), {
    weekday: 'short',
    timeZone: 'UTC',
  });
  return fmt.format(d);
}

function renderCard(
  dateKey: string,
  weatherCode: number,
  tMax: number,
  tMin: number,
  prob: number | null,
  locale: string
) {
  const group = codeGroup(weatherCode);
  return (
    <div
      key={dateKey}
      className="rounded-xl p-4 flex flex-col items-center text-center"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
        {dayLabel(dateKey, locale)}
      </span>
      <span className="text-3xl my-2" aria-hidden="true">{weatherEmoji(group)}</span>
      <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
        {Math.round(tMax)}° / {Math.round(tMin)}°
      </span>
      <span className="mt-1 text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
        💧 {prob == null ? '—' : `${prob}%`}
      </span>
    </div>
  );
}

export default function WeatherClient({ initial }: { initial: WeatherPayload | null }) {
  const t = useTranslations('weather');
  const locale = useLocale();
  const [data, setData] = useState<WeatherPayload | null>(initial);

  const dict = {
    tags: (t.raw('tags') || {}) as Record<string, string>,
    outfit: (t.raw('advice.outfit') || {}) as Record<string, string>,
    play: (t.raw('advice.play') || {}) as Record<string, string>,
    risk: (t.raw('advice.risk') || {}) as Record<string, string>,
    gear: (t.raw('advice.gear') || {}) as Record<string, string>,
  };

  useEffect(() => {
    let alive = true;
    async function refresh() {
      const fresh = await fetchWeather();
      if (alive && fresh) setData(fresh);
    }
    refresh();
    const id = setInterval(refresh, 15 * 60 * 1000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  if (!data) {
    return (
      <p className="text-sm rounded-xl p-5" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
        {t('unavailable')}
      </p>
    );
  }

  const current = data.current;
  const daily = data.daily;
  const todayKey = current.time.slice(0, 10);
  const todayIdx = Math.max(0, daily.time.findIndex((d) => d === todayKey));
  const group = codeGroup(current.weather_code);

  const tMax = daily.temperature_2m_max[todayIdx] ?? daily.temperature_2m_max[0];
  const tMin = daily.temperature_2m_min[todayIdx] ?? daily.temperature_2m_min[0];
  const prob = daily.precipitation_probability_max[todayIdx] ?? null;
  const precipSum = daily.precipitation_sum[todayIdx] ?? null;
  const windRef = Math.max(
    daily.wind_speed_10m_max?.[todayIdx] ?? 0,
    daily.wind_gusts_10m_max?.[todayIdx] ?? 0,
    current.wind_speed_10m
  );
  const uv = daily.uv_index_max?.[todayIdx] ?? null;

  const { risks, hits } = buildAdvice(data);
  const outfitItems = hits.filter((h) => h.bucket === 'outfit').map((h) => dict.outfit[h.key]);
  const playItems = hits.filter((h) => h.bucket === 'play').map((h) => dict.play[h.key]);
  const gearItems = [...new Set(hits.filter((h) => h.bucket === 'gear').map((h) => dict.gear[h.key]))];
  const hasAdvice = outfitItems.length + playItems.length + gearItems.length > 0;

  return (
    <div>
      {/* 顶部：当前实况 + 今日速览 */}
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 sm:gap-6 mb-4">
        <div
          className="rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-w-0"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <div className="flex items-start justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
              {t('now')}
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {t('updated')} {current.time.slice(11, 16)}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-5xl sm:text-6xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
              {Math.round(current.temperature_2m)}°
            </span>
            <div>
              <div className="text-3xl" aria-hidden="true">{weatherEmoji(group)}</div>
              <div className="text-sm font-medium mt-1" style={{ color: 'var(--text-secondary)' }}>
                {t(`code.${group}`)}
              </div>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 mt-6 text-sm">
            <div>
              <dt className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('feelsLike')}</dt>
              <dd className="font-medium" style={{ color: 'var(--text-primary)' }}>{Math.round(current.apparent_temperature)}°C</dd>
            </div>
            <div>
              <dt className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('humidity')}</dt>
              <dd className="font-medium" style={{ color: 'var(--text-primary)' }}>{current.relative_humidity_2m}%</dd>
            </div>
            <div>
              <dt className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('wind')}</dt>
              <dd className="font-medium" style={{ color: 'var(--text-primary)' }}>
                {Math.round(current.wind_speed_10m)} km/h
                {current.wind_gusts_10m > current.wind_speed_10m + 5
                  ? ` · ${Math.round(current.wind_gusts_10m)}`
                  : ''}
              </dd>
            </div>
            <div>
              <dt className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('uv')}</dt>
              <dd className="font-medium" style={{ color: 'var(--text-primary)' }}>{uv == null ? '—' : Math.round(uv)}</dd>
            </div>
          </dl>
        </div>

        <div
          className="rounded-2xl p-6 sm:p-7 flex flex-col justify-center"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl" aria-hidden="true">☂️</span>
            <h3 className="text-lg font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
              {t('umbrellaQ')}
            </h3>
          </div>
          <p className="text-base leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
            {t(`umbrella.${umbrellaLevel(prob)}`)}
          </p>
          <h4 className="text-xs font-semibold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--accent)' }}>
            {t('todayQuick')}
          </h4>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl p-3" style={{ background: 'var(--bg-secondary)' }}>
              <dt className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('todayHighLow')}</dt>
              <dd className="font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>
                {Math.round(tMax)}° / {Math.round(tMin)}°
              </dd>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'var(--bg-secondary)' }}>
              <dt className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('precipProb')}</dt>
              <dd className="font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>
                {prob == null ? '—' : `${prob}%`}
              </dd>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'var(--bg-secondary)' }}>
              <dt className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('precip')}</dt>
              <dd className="font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>
                {precipSum == null ? '—' : `${precipSum} mm`}
              </dd>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'var(--bg-secondary)' }}>
              <dt className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('wind')}</dt>
              <dd className="font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>{Math.round(windRef)} km/h</dd>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'var(--bg-secondary)' }}>
              <dt className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('uv')}</dt>
              <dd className="font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>{uv == null ? '—' : Math.round(uv)}</dd>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'var(--bg-secondary)' }}>
              <dt className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('feelsLike')}</dt>
              <dd className="font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>
                {Math.round(current.apparent_temperature)}°C
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* 风险提醒：有预警才出现 */}
      {risks.length > 0 ? (
        <div
          className="rounded-2xl p-5 sm:p-6 mb-4"
          style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.3)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl" aria-hidden="true">⚠️</span>
            <h3 className="font-display font-semibold" style={{ color: '#b91c1c' }}>
              {dict.tags.risk}
            </h3>
          </div>
          <ul className="space-y-2">
            {risks.map((key) => (
              <li key={key} className="flex items-start gap-2 text-sm sm:text-base leading-relaxed" style={{ color: '#b91c1c' }}>
                <span className="mt-1 flex-shrink-0" aria-hidden="true">•</span>
                <span>{dict.risk[key] || key}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p
          className="rounded-2xl px-5 py-3 mb-4 text-sm flex items-center gap-2"
          style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: 'var(--text-secondary)' }}
        >
          <span aria-hidden="true">✅</span>
          {t('noRisk')}
        </p>
      )}

      {/* 三类建议：不满足条件的整块自动隐藏 */}
      {hasAdvice ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {outfitItems.length > 0 && (
            <div className="rounded-2xl p-5 sm:p-6" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <h3 className="flex items-center gap-2 font-display font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                <span aria-hidden="true">🧥</span>
                {dict.tags.outfit}
              </h3>
              <ul className="space-y-2">
                {outfitItems.map((text, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} aria-hidden="true">✓</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {playItems.length > 0 && (
            <div className="rounded-2xl p-5 sm:p-6" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <h3 className="flex items-center gap-2 font-display font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                <span aria-hidden="true">🧭</span>
                {dict.tags.play}
              </h3>
              <ul className="space-y-2">
                {playItems.map((text, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} aria-hidden="true">✓</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {gearItems.length > 0 && (
            <div className="rounded-2xl p-5 sm:p-6" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <h3 className="flex items-center gap-2 font-display font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                <span aria-hidden="true">🎒</span>
                {dict.tags.items}
              </h3>
              <div className="flex flex-wrap gap-2">
                {gearItems.map((text, i) => (
                  <span
                    key={i}
                    className="rounded-full px-3 py-1.5 text-xs sm:text-sm"
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p
          className="rounded-2xl px-5 py-4 mb-8 text-sm text-center"
          style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
        >
          {t('calm')}
        </p>
      )}

      {/* 未来多日预报 */}
      <h3 className="text-lg font-display font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        {t('days')}
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {daily.time.map((dateKey, i) =>
          renderCard(
            dateKey,
            daily.weather_code[i],
            daily.temperature_2m_max[i],
            daily.temperature_2m_min[i],
            daily.precipitation_probability_max[i],
            locale
          )
        )}
      </div>
    </div>
  );
}

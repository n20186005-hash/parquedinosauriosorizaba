import { getTranslations } from 'next-intl/server';
import { fetchWeather, WeatherPayload } from '@/lib/weather';
import WeatherClient from './WeatherClient';

// 构建期去重缓存：同一份数据只请求一次，结果随页面静态产物持久化
let cached: Promise<WeatherPayload | null> | null = null;
function getWeatherOnce(): Promise<WeatherPayload | null> {
  if (!cached) cached = fetchWeather();
  return cached;
}

export default async function WeatherSection() {
  const t = await getTranslations('weather');
  const data = await getWeatherOnce();

  return (
    <section id="weather" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
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

        {/* 服务端会尝试在构建/SSR 时抓取一次；若失败也不阻塞，
            客户端挂载后会自动拉取恢复（WeatherClient 内部兜底提示） */}
        <WeatherClient initial={data} />
      </div>
    </section>
  );
}

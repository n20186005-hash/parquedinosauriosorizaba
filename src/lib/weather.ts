// 天气数据访问层：根据园区坐标拉取实况与预报数据。
// 页面不会向访客展示任何关于数据来源的实现说明。
export type CodeGroup =
  | 'clear'
  | 'partly'
  | 'cloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'showers'
  | 'thunder';

export interface WeatherPayload {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    is_day: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
    precipitation: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: (number | null)[];
    precipitation_sum: (number | null)[];
    wind_speed_10m_max: (number | null)[];
    wind_gusts_10m_max: (number | null)[];
    uv_index_max: (number | null)[];
  };
}

const API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=18.85909&longitude=-97.11777&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max,uv_index_max&timezone=America%2FMexico_City&forecast_days=7';

export async function fetchWeather(): Promise<WeatherPayload | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    const res = await fetch(API_URL, { signal: controller.signal, cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json?.current?.time || !Array.isArray(json?.daily?.time)) return null;
    return json as WeatherPayload;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export function codeGroup(code: number): CodeGroup {
  if (code === 0) return 'clear';
  if (code === 1) return 'partly';
  if (code === 2) return 'cloudy';
  if (code === 3) return 'overcast';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code >= 61 && code <= 67) return 'rain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code === 80 || code === 81 || code === 82) return 'showers';
  if (code === 85 || code === 86) return 'snow';
  if (code >= 95) return 'thunder';
  return 'partly';
}

export function weatherEmoji(group: CodeGroup): string {
  const map: Record<CodeGroup, string> = {
    clear: '☀️',
    partly: '⛅',
    cloudy: '🌤️',
    overcast: '☁️',
    fog: '🌫️',
    drizzle: '🌦️',
    rain: '🌧️',
    snow: '🌨️',
    showers: '🌦️',
    thunder: '⛈️',
  };
  return map[group];
}

// ---- 面向游客的建议引擎（纯逻辑，文案由前端按语言渲染）----

export type AdviceBucket = 'outfit' | 'play' | 'gear';
export interface AdviceHit {
  bucket: AdviceBucket;
  key: string;
}

const isRainingCode = (code: number) =>
  (code >= 51 && code <= 57) ||
  (code >= 61 && code <= 67) ||
  (code >= 80 && code <= 82) ||
  code >= 95;

const LIGHT_RAIN_CODES = new Set([51, 53, 55, 56, 57, 61, 80]);
const THUNDER_CODES = new Set([95, 96, 99]);
const HEAVY_RAIN_CODES = new Set([63, 65, 81, 82]);

export function buildAdvice(p: WeatherPayload): {
  risks: string[];
  hits: AdviceHit[];
} {
  const risks: string[] = [];
  const hits: AdviceHit[] = [];
  const push = (bucket: AdviceBucket, key: string) => hits.push({ bucket, key });

  const d = p.daily;
  const codeNow = p.current.weather_code;
  const codeToday = d.weather_code[0] ?? codeNow;
  const maxT = d.temperature_2m_max[0];
  const minT = d.temperature_2m_min[0];
  const prob = d.precipitation_probability_max[0];
  const precipSum = d.precipitation_sum[0];
  const windRef = Math.max(
    d.wind_speed_10m_max?.[0] ?? p.current.wind_speed_10m,
    d.wind_gusts_10m_max?.[0] ?? 0
  );
  const uv = d.uv_index_max?.[0] ?? null;

  const rainingNow = p.current.precipitation > 0 && isRainingCode(codeNow);
  const thunderNow = THUNDER_CODES.has(codeNow);
  const thunderToday = THUNDER_CODES.has(codeToday);
  const heavyToday = HEAVY_RAIN_CODES.has(codeToday) || (precipSum ?? 0) >= 20;

  // ---- 风险提醒（有预警才输出，优先级最高）----
  if (thunderNow || thunderToday) {
    risks.push('thunder');
  } else if (heavyToday || (rainingNow && !LIGHT_RAIN_CODES.has(codeNow))) {
    risks.push('heavyRain');
  }
  if (windRef >= 50) risks.push('wind');
  if (codeNow === 45 || codeNow === 48 || codeToday === 45 || codeToday === 48) {
    risks.push('fog');
  }
  if (maxT != null && maxT >= 35) risks.push('heat');

  // ---- 降水 ----
  if (thunderNow || thunderToday) {
    push('outfit', 'rainy');
    push('play', 'thunder');
  } else if (rainingNow) {
    if (LIGHT_RAIN_CODES.has(codeNow)) {
      push('outfit', 'rainNow');
      push('play', 'rainNow');
    } else {
      push('play', 'heavy');
    }
  } else if (heavyToday) {
    push('play', 'heavy');
  } else if (prob != null && prob >= 60) {
    push('outfit', 'rainLikely');
    push('play', 'rainLikely');
  } else if (prob != null && prob >= 30) {
    push('outfit', 'rainPossible');
  }

  const rainAdvised = rainingNow || THUNDER_CODES.has(codeToday) || (prob ?? 0) >= 60;

  // ---- 日照类型（有雨时不再输出晴朗/阴天类建议）----
  if (!rainAdvised) {
    const g = codeGroup(codeToday);
    if (g === 'clear' || g === 'partly') push('play', 'sunny');
    else if (g === 'overcast' || g === 'cloudy') push('play', 'overcast');
  }

  // ---- 紫外线（热带高原日照强，按紫外线指数分级）----
  if (uv != null && !rainAdvised) {
    if (uv >= 5) push('outfit', 'uv');
  }

  // ---- 温度 ----
  if (maxT != null && maxT >= 32) {
    push('outfit', 'hot');
    push('play', 'hot');
  }
  if (maxT != null && maxT <= 12) {
    push('outfit', 'cold');
  } else if (
    maxT != null &&
    minT != null &&
    maxT - minT > 8 &&
    maxT < 30
  ) {
    push('outfit', 'diurnal');
  }

  // ---- 风力（5-6级 / 7级以上已进风险）----
  if (windRef >= 29 && windRef < 50) {
    push('outfit', 'windy');
    push('play', 'windy');
  } else if (windRef >= 50) {
    push('play', 'gale');
  }

  // ---- 随身物品 ----
  const gear: string[] = [];
  if (rainingNow || (prob ?? 0) >= 30 || THUNDER_CODES.has(codeToday)) {
    gear.push('umbrella');
    if ((prob ?? 0) >= 60 || rainingNow) gear.push('raincoat');
    if (rainingNow && !LIGHT_RAIN_CODES.has(codeNow)) gear.push('extraShoes');
  }
  if (uv != null && !rainAdvised && uv >= 3) {
    gear.push('sunscreen');
    if (uv >= 7) {
      gear.push('sunglasses');
      gear.push('hat');
    }
  }
  if (maxT != null && maxT >= 30 && !rainAdvised) gear.push('water');
  if (
    maxT != null &&
    minT != null &&
    maxT - minT > 8 &&
    maxT < 30 &&
    minT < 16
  ) {
    gear.push('lightJacket');
  }
  if (maxT != null && maxT <= 12) {
    gear.push('warmCoat');
  }
  for (const key of gear) push('gear', key);

  return { risks, hits };
}

export type UmbrellaLevel = 'likely' | 'possible' | 'unlikely';

export function umbrellaLevel(prob: number | null | undefined): UmbrellaLevel {
  if (prob == null || prob < 30) return 'unlikely';
  if (prob >= 60) return 'likely';
  return 'possible';
}

export function compassDir(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(((deg % 360) + 360) % 360 / 45) % 8];
}

export function dateLocale(locale: string): string {
  if (locale === 'zh') return 'zh-CN';
  if (locale === 'es') return 'es-MX';
  return 'en';
}

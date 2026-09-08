/**
 * =====================================================================
 * 单景点 SEO 实体绑定配置变量表 (Single-Attraction SEO Entity Config)
 * =====================================================================
 * 模板变量占位符            | 本景点（Expo Parque de los Dinosaurios）取值
 * ---------------------------------------------------------------------
 * {{DOMAIN_NAME}}           | parquedinosauriosorizaba.com
 * {{ATTRACTION_FULL_NAME}}  | Expo Parque de los Dinosaurios
 * {{ATTRACTION_SHORT_NAME}} | Parque de los Dinosaurios (Orizaba Dinosaur Park / 奥里萨巴恐龙公园)
 * {{CITY_NAME}}             | Orizaba
 * {{STATE_PROVINCE}}        | Veracruz
 * {{COUNTRY_NAME}}          | Mexico
 * {{COUNTRY_CODE_2LETTER}}  | MX
 * {{POSTAL_CODE}}           | 94345
 * {{LATITUDE}}              | 18.85909
 * {{LONGITUDE}}             | -97.1177707
 * {{MAPS_SHARE_URL}}        | https://maps.app.goo.gl/cqu6z9om3WepAKY47
 * {{MAPS_EMBED_SRC}}        | 见下方 mapsEmbedSrc
 * {{NEARBY_LANDMARK_1}}     | Parque de las Sonrisas
 * {{NEARBY_LANDMARK_2}}     | Teleférico de Orizaba
 * {{GOVT_TOURISM_URL}}      | https://www.orizaba.travel/
 * =====================================================================
 */

export const SITE = {
  domain: 'parquedinosauriosorizaba.com',
  baseUrl: 'https://parquedinosauriosorizaba.com',

  // 实体信息（用于 JSON-LD / TDK / 页面语义绑定）
  fullName: 'Expo Parque de los Dinosaurios',
  shortName: 'Parque de los Dinosaurios',
  shortNameEn: 'Orizaba Dinosaur Park',
  city: 'Orizaba',
  stateProvince: 'Veracruz',
  country: 'Mexico',
  countryCode: 'MX',
  postalCode: '94345',
  plusCode: 'VW46+WV',
  streetAddress: 'Priv. de Circunvalación, Agrícola Moctezuma',

  // 地理坐标（来自官方 Google Maps 嵌入信息）
  latitude: 18.85909,
  longitude: -97.1177707,

  // 周边核心地标（语义集群）
  landmark1: 'Parque de las Sonrisas',
  landmark2: 'Teleférico de Orizaba',

  // 政府 / 官方旅游局
  tourismUrl: 'https://www.orizaba.travel/',
  tourismParkPageUrl: 'https://www.orizaba.travel/parque-dinosaurios/',

  // Google Maps
  mapsShareUrl: 'https://maps.app.goo.gl/cqu6z9om3WepAKY47',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d53724.07575132501!2d-97.1177707!3d18.85909!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c4fd63a862ed03%3A0x256592511cebadde!2sExpo%20Parque%20de%20los%20Dinosaurios!5e1!3m2!1szh-CN!2s!4v1788846493885!5m2!1szh-CN!2s',

  // 评分（Google Maps 最新）
  rating: '4.7',
  reviewCount: '9,919',

  // 首图（OG/JSON-LD image）
  heroImagePath: '/gallery/expo-parque-de-los-dinosaurios-orizaba-1.jpg',
  heroImageUrl:
    'https://parquedinosauriosorizaba.com/gallery/expo-parque-de-los-dinosaurios-orizaba-1.jpg',

  // GA4
  gaId: 'G-HXM22WWPKP',
} as const;

export type SiteConfig = typeof SITE;

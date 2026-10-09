import type { Locale } from '@/i18n/routing';

export type TopicSlug =
  | 'precios-horarios'
  | 'como-llegar'
  | 'fotos'
  | 'visitar-con-ninos';

export type TopicSection = { id: string; title: string; body: string[] };
export type TopicFaq = { q: string; a: string };

export type TopicContent = {
  h1: string;
  intro: string;
  sections: TopicSection[];
  faq: TopicFaq[];
};

export const TOPIC_SLUGS: TopicSlug[] = [
  'precios-horarios',
  'como-llegar',
  'fotos',
  'visitar-con-ninos',
];

export const topicMeta: Record<
  TopicSlug,
  Record<Locale, { title: string; description: string }>
> = {
  'precios-horarios': {
    es: {
      title: 'Precios y Horarios del Parque de los Dinosaurios Orizaba',
      description:
        'Horarios de apertura y precios del Parque de los Dinosaurios en Orizaba, Veracruz. Residentes locales gratis, visitantes generales desde $150 MXN e incluye atracciones cercanas.',
    },
    en: {
      title: 'Orizaba Dinosaur Park Prices & Opening Hours',
      description:
        'Opening hours and prices for the Dinosaur Park in Orizaba, Veracruz. Local residents free, general visitors from $150 MXN, often including nearby attractions.',
    },
    zh: {
      title: '奥里萨巴恐龙公园门票与开放时间',
      description:
        '奥里萨巴恐龙公园的开放时间与门票价格。本地居民免费，一般游客约 150 墨西哥比索起，通常包含邻近景点。',
    },
  },
  'como-llegar': {
    es: {
      title: 'Cómo Llegar al Parque de los Dinosaurios en Orizaba',
      description:
        'Cómo llegar al Parque de los Dinosaurios en Orizaba, Veracruz: desde el aeropuerto de Veracruz, desde la Ciudad de México, en transporte público y en coche con estacionamiento.',
    },
    en: {
      title: 'How to Get to the Dinosaur Park in Orizaba',
      description:
        'How to reach the Dinosaur Park in Orizaba, Veracruz: from Veracruz airport, from Mexico City, by public transport, and by car with parking.',
    },
    zh: {
      title: '如何前往奥里萨巴恐龙公园',
      description:
        '如何前往奥里萨巴恐龙公园：从韦拉克鲁斯机场、从墨西哥城、搭乘公共交通，以及自驾与停车信息。',
    },
  },
  fotos: {
    es: {
      title: 'Fotos del Parque de los Dinosaurios en Orizaba',
      description:
        'Galería y consejos de fotografía del Parque de los Dinosaurios en Orizaba: modelos a tamaño real, zona interactiva, mejores horarios para fotografiar y consejos.',
    },
    en: {
      title: 'Photos of the Dinosaur Park in Orizaba',
      description:
        'Photo gallery and photography tips for the Dinosaur Park in Orizaba: life-size models, the interactive zone, best times to shoot and handy tips.',
    },
    zh: {
      title: '奥里萨巴恐龙公园照片',
      description:
        '奥里萨巴恐龙公园的相册与拍照建议：真实尺寸模型、互动体验区、最佳拍摄时间与实用技巧。',
    },
  },
  'visitar-con-ninos': {
    es: {
      title: 'Visita al Parque de los Dinosaurios con Niños en Orizaba',
      description:
        'Guía para visitar el Parque de los Dinosaurios en Orizaba con niños: por qué les encanta, consejos para familias, atracciones cercanas y un plan de medio día.',
    },
    en: {
      title: 'Visiting the Dinosaur Park with Kids in Orizaba',
      description:
        'Family guide to the Dinosaur Park in Orizaba with kids: why they love it, tips for families, nearby kid-friendly attractions and a half-day plan.',
    },
    zh: {
      title: '带小孩游览奥里萨巴恐龙公园',
      description:
        '带小孩游览奥里萨巴恐龙公园的家庭攻略：孩子为何喜欢、家庭建议、邻近亲子景点与半日行程。',
    },
  },
};

export const topicContent: Record<TopicSlug, Record<Locale, TopicContent>> = {
  'precios-horarios': {
    es: {
      h1: 'Precios y Horarios del Parque de los Dinosaurios en Orizaba',
      intro:
        'Antes de salir, revisa los horarios de apertura y la política de precios del Expo Parque de los Dinosaurios. La información puede cambiar según la temporada o los eventos; confirma siempre lo vigente en el lugar.',
      sections: [
        {
          id: 'horarios',
          title: 'Horarios de apertura',
          body: [
            'El parque suele abrir de jueves a domingo de 10:00 a 22:00 y permanece cerrado los lunes, martes y miércoles.',
            'En fechas festivas o vacaciones escolares el horario puede modificarse; consulta el aviso oficial o llama antes de tu visita para evitar sorpresas.',
          ],
        },
        {
          id: 'precios',
          title: 'Precios de entrada',
          body: [
            'Los residentes locales de Orizaba entran gratis presentando una identificación oficial vigente con domicilio en el municipio.',
            'Los visitantes generales normalmente pagan una cuota de aproximadamente $150 MXN; este acceso suele incluir atracciones vecinas como Casavegas y el Parque de las Sonrisas. Niño, estudiantes y grupos/escuelas pueden tener tarifas especiales o descuentos.',
          ],
        },
        {
          id: 'mejor-momento',
          title: 'Mejor momento para visitar',
          body: [
            'Las visitas por la tarde suelen ser más frescas y cómodas; los días de semana tienen menos afluencia que los fines de semana y puentes.',
            'Llega temprano si vas en familia los fines de semana: el estacionamiento y las áreas interactivas se llenan rápido.',
          ],
        },
      ],
      faq: [
        {
          q: '¿Cuánto cuesta la entrada al Parque de los Dinosaurios en Orizaba?',
          a: 'Los residentes locales entran gratis con identificación oficial; los visitantes generales normalmente pagan alrededor de $150 MXN, y ese acceso suele incluir atracciones cercanas como Casavegas y el Parque de las Sonrisas. Confirma el precio vigente en el lugar.',
        },
        {
          q: '¿El parque abre los lunes?',
          a: 'No. El parque permanece cerrado los lunes, martes y miércoles; abre jueves a domingo de 10:00 a 22:00. Los horarios festivos pueden variar.',
        },
        {
          q: '¿La entrada incluye otras atracciones?',
          a: 'Según la temporada, el acceso suele incluir atracciones vecinas como Casavegas y el Parque de las Sonrisas. Pregunta al comprar qué está incluido.',
        },
        {
          q: '¿Hay descuento para estudiantes?',
          a: 'Sí, suele haber descuentos para estudiantes con credencial vigente y tarifas especiales para grupos y escuelas. Confirma en taquilla.',
        },
      ],
    },
    en: {
      h1: 'Prices & Opening Hours of the Dinosaur Park in Orizaba',
      intro:
        'Before you head out, check the opening hours and pricing policy of Expo Dinosaur Park. Details may change with the season or events; always confirm the current info on site.',
      sections: [
        {
          id: 'horarios',
          title: 'Opening hours',
          body: [
            'The park is generally open Thursday to Sunday from 10:00 to 22:00 and closed on Mondays, Tuesdays and Wednesdays.',
            'On public holidays or school vacations the schedule may change; check the official notice or call ahead so you are not surprised.',
          ],
        },
        {
          id: 'precios',
          title: 'Admission prices',
          body: [
            'Local residents of Orizaba enter free with a valid official ID showing a municipal address.',
            'General visitors usually pay a fee of about $150 MXN; this admission often includes neighbouring attractions such as Casavegas and Parque de las Sonrisas. Children, students and groups/schools may have special rates or discounts.',
          ],
        },
        {
          id: 'mejor-momento',
          title: 'Best time to visit',
          body: [
            'Afternoon visits are usually cooler and more comfortable; weekdays are less crowded than weekends and holiday bridges.',
            'Arrive early if you go with family on weekends: parking and the interactive areas fill up fast.',
          ],
        },
      ],
      faq: [
        {
          q: 'How much does it cost to enter the Dinosaur Park in Orizaba?',
          a: 'Local residents enter free with an official ID; general visitors usually pay around $150 MXN, and that admission often includes nearby attractions such as Casavegas and Parque de las Sonrisas. Confirm the current price on site.',
        },
        {
          q: 'Is the park open on Mondays?',
          a: 'No. The park is closed on Mondays, Tuesdays and Wednesdays; it is open Thursday to Sunday from 10:00 to 22:00. Holiday hours may vary.',
        },
        {
          q: 'Does admission include other attractions?',
          a: 'Depending on the season, admission often includes nearby attractions such as Casavegas and Parque de las Sonrisas. Ask at the ticket office what is included.',
        },
        {
          q: 'Are there student discounts?',
          a: 'Yes, students usually get discounts with a valid ID, and there are special rates for groups and schools. Confirm at the box office.',
        },
      ],
    },
    zh: {
      h1: '奥里萨巴恐龙公园的门票与开放时间',
      intro:
        '出发前请先查看 Expo 恐龙公园的开放时间与票价政策。相关信息可能随季节或活动调整，请以现场最新公告为准。',
      sections: [
        {
          id: 'horarios',
          title: '开放时间',
          body: [
            '公园通常周四至周日 10:00–22:00 开放，周一、周二、周三休园。',
            '在国定假日或学校假期期间，开放时间可能调整；出发前请查看官方公告或致电确认。',
          ],
        },
        {
          id: 'precios',
          title: '门票价格',
          body: [
            '奥里萨巴本地居民凭有效的本市官方证件可免费入园。',
            '一般游客通常需支付约 150 墨西哥比索；该门票通常包含 Casavegas、笑颜公园等邻近景点。儿童、学生以及团体／学校可能有专属价格或优惠。',
          ],
        },
        {
          id: 'mejor-momento',
          title: '最佳游览时间',
          body: [
            '下午通常较凉爽舒适；工作日比周末与连假人潮更少。',
            '若周末带家人前往，建议提早到达：停车场与互动区很快就会满。',
          ],
        },
      ],
      faq: [
        {
          q: '奥里萨巴恐龙公园门票多少钱？',
          a: '本地居民凭官方证件免费入园；一般游客通常约 150 墨西哥比索，且该门票通常包含 Casavegas、笑颜公园等邻近景点。请以现场最新价格为准。',
        },
        {
          q: '公园周一开放吗？',
          a: '不开放。公园周一、周二、周三休园，周四至周日 10:00–22:00 开放。假日开放时间可能调整。',
        },
        {
          q: '门票包含其他景点吗？',
          a: '依季节不同，门票通常包含 Casavegas、笑颜公园等邻近景点。购票时请向售票处确认所含项目。',
        },
        {
          q: '学生有优惠吗？',
          a: '有，学生凭有效证件通常享有优惠，团体与学校也有专属价格。请向售票处确认。',
        },
      ],
    },
  },

  'como-llegar': {
    es: {
      h1: 'Cómo Llegar al Parque de los Dinosaurios en Orizaba',
      intro:
        'El Expo Parque de los Dinosaurios se encuentra sobre Priv. de Circunvalación, en la colonia Agrícola Moctezuma, al sur de Orizaba, Veracruz. Aquí tienes las formas más comunes de llegar.',
      sections: [
        {
          id: 'desde-aeropuerto',
          title: 'Desde el Aeropuerto de Veracruz (VER)',
          body: [
            'El aeropuerto internacional más cercano es el de Veracruz (Aeropuerto Internacional General Heriberto Jara, código VER), a unas 1.5–2 horas en coche de Orizaba.',
            'Desde el aeropuerto puedes rentar un auto o tomar un autobús interurbano (líneas como ADO) hasta la central de autobuses de Orizaba, y luego un taxi o colectivo al parque.',
          ],
        },
        {
          id: 'desde-cdmx',
          title: 'Desde la Ciudad de México',
          body: [
            'En coche, Orizaba está a unas 2.5–3 horas por la autopista (ruta hacia Veracruz/Córdoba).',
            'En autobús, varias líneas (por ejemplo ADO) conectan la Ciudad de México con la central de autobuses de Orizaba; desde ahí toma un taxi de unos 15–20 minutos al parque.',
          ],
        },
        {
          id: 'transporte-local',
          title: 'Transporte público local',
          body: [
            'Desde el centro de Orizaba puedes tomar un taxi o un colectivo (transporte público) hacia la zona de Circunvalación / Agrícola Moctezuma.',
            'Si viajas ligero, las apps de taxi o los taxis de sitio son la opción más directa para llegar a la entrada.',
          ],
        },
        {
          id: 'en-coche',
          title: 'En coche y estacionamiento',
          body: [
            'Usa el navegador con la dirección «Priv. de Circunvalación, Agrícola Moctezuma, Orizaba» y aparcamiento cerca de la entrada principal (acceso por Casavegas).',
            'Hay zonas públicas de estacionamiento junto a la entrada y sobre la Circunvalación; los fines de semana y festivos se llenan pronto, así que llega fuera de las horas punta.',
          ],
        },
      ],
      faq: [
        {
          q: '¿A qué distancia está el parque del centro de Orizaba?',
          a: 'Está a unos 15–20 minutos en taxi desde el centro, sobre la Circunvalación en la colonia Agrícola Moctezuma.',
        },
        {
          q: '¿El estacionamiento tiene costo?',
          a: 'Suele haber zonas públicas de estacionamiento cerca de la entrada; confirma el costo y disponibilidad en el lugar, ya que varían por temporada.',
        },
        {
          q: '¿Qué taxi o transporte recomiendan desde la central de autobuses?',
          a: 'Desde la central de autobuses de Orizaba, un taxi de sitio o una app de movilidad te deja en la entrada en unos 15–20 minutos.',
        },
        {
          q: '¿Se puede llegar en transporte público sin carro?',
          a: 'Sí. Toma un autobús interurbano a Orizaba y luego taxi o colectivo local hacia la zona de Circunvalación.',
        },
      ],
    },
    en: {
      h1: 'How to Get to the Dinosaur Park in Orizaba',
      intro:
        'Expo Dinosaur Park sits along Priv. de Circunvalación in the Agrícola Moctezuma neighbourhood, south of Orizaba, Veracruz. Here are the most common ways to get there.',
      sections: [
        {
          id: 'desde-aeropuerto',
          title: 'From Veracruz Airport (VER)',
          body: [
            'The nearest major airport is Veracruz International Airport (Aeropuerto Internacional General Heriberto Jara, code VER), about 1.5–2 hours by car from Orizaba.',
            'From the airport you can rent a car or take an intercity bus (e.g. ADO) to Orizaba’s bus terminal, then a taxi or colectivo to the park.',
          ],
        },
        {
          id: 'desde-cdmx',
          title: 'From Mexico City',
          body: [
            'By car, Orizaba is about 2.5–3 hours via the toll highway (towards Veracruz/Córdoba).',
            'By bus, several lines (for example ADO) connect Mexico City with Orizaba’s bus terminal; from there a taxi takes about 15–20 minutes to the park.',
          ],
        },
        {
          id: 'transporte-local',
          title: 'Local public transport',
          body: [
            'From downtown Orizaba you can take a taxi or a colectivo (public transport) towards the Circunvalación / Agrícola Moctezuma area.',
            'If you travel light, ride-hailing apps or sitio taxis are the most direct way to reach the entrance.',
          ],
        },
        {
          id: 'en-coche',
          title: 'By car and parking',
          body: [
            'Use your navigator with the address «Priv. de Circunvalación, Agrícola Moctezuma, Orizaba» and park near the main entrance (Casavegas access).',
            'Public parking areas sit by the entrance and along Circunvalación; they fill up quickly on weekends and holidays, so arrive off-peak.',
          ],
        },
      ],
      faq: [
        {
          q: 'How far is the park from downtown Orizaba?',
          a: 'It is about a 15–20 minute taxi ride from the centre, along Circunvalación in the Agrícola Moctezuma neighbourhood.',
        },
        {
          q: 'Does parking cost money?',
          a: 'There are usually public parking areas near the entrance; confirm cost and availability on site, as they vary by season.',
        },
        {
          q: 'Which taxi or transport do you recommend from the bus terminal?',
          a: 'From Orizaba’s bus terminal, a sitio taxi or ride-hailing app will drop you at the entrance in about 15–20 minutes.',
        },
        {
          q: 'Can I get there by public transport without a car?',
          a: 'Yes. Take an intercity bus to Orizaba, then a local taxi or colectivo towards the Circunvalación area.',
        },
      ],
    },
    zh: {
      h1: '如何前往奥里萨巴恐龙公园',
      intro:
        'Expo 恐龙公园位于韦拉克鲁斯州奥里萨巴市南侧的 Agrícola Moctezuma 区、Circunvalación 私有路上。以下是最常见的到达方式。',
      sections: [
        {
          id: 'desde-aeropuerto',
          title: '从韦拉克鲁斯机场（VER）',
          body: [
            '最近的主要机场是韦拉克鲁斯国际机场（Aeropuerto Internacional General Heriberto Jara，代码 VER），距奥里萨巴约 1.5–2 小时车程。',
            '从机场可租车，或搭乘城际巴士（如 ADO）前往奥里萨巴客运总站，再转乘出租车或 colectivo 前往公园。',
          ],
        },
        {
          id: 'desde-cdmx',
          title: '从墨西哥城',
          body: [
            '自驾经收费公路（往韦拉克鲁斯／科尔多瓦方向），奥里萨巴约 2.5–3 小时车程。',
            '搭乘巴士，多家公司（如 ADO）连接墨西哥城与奥里萨巴客运总站；出站后打车约 15–20 分钟即达公园。',
          ],
        },
        {
          id: 'transporte-local',
          title: '当地公共交通',
          body: [
            '从奥里萨巴市中心可搭乘出租车或 colectivo（公共小巴）前往 Circunvalación／Agrícola Moctezuma 一带。',
            '若行李不多，叫车软件或站点出租车是直达入口最方便的选择。',
          ],
        },
        {
          id: 'en-coche',
          title: '自驾与停车',
          body: [
            '在导航中输入地址「Priv. de Circunvalación, Agrícola Moctezuma, Orizaba」，并停在主入口附近（Casavegas 入口）。',
            '入口旁与 Circunvalación 沿线有公共停车区；周末与假日很快停满，建议避开高峰时段到达。',
          ],
        },
      ],
      faq: [
        {
          q: '公园离奥里萨巴市中心多远？',
          a: '从市中心打车约 15–20 分钟，位于 Agrícola Moctezuma 区的 Circunvalación 一带。',
        },
        {
          q: '停车要收费吗？',
          a: '入口附近通常有公共停车区；费用与 availability 随季节变动，请以现场为准。',
        },
        {
          q: '从客运总站建议搭什么车？',
          a: '从奥里萨巴客运总站，站点出租车或叫车软件约 15–20 分钟即可送达入口。',
        },
        {
          q: '没有车也能靠公共交通到达吗？',
          a: '可以。先搭城际巴士到奥里萨巴，再转乘当地出租车或 colectivo 前往 Circunvalación 一带。',
        },
      ],
    },
  },

  fotos: {
    es: {
      h1: 'Fotos del Parque de los Dinosaurios en Orizaba',
      intro:
        'El Expo Parque de los Dinosaurios es uno de los lugares más fotografiados de Orizaba: modelos a tamaño real, una zona interactiva y mucho espacio al aire libre. Aquí abajo puedes ver la galería y algunos consejos para tus propias fotos.',
      sections: [
        {
          id: 'que-veras',
          title: 'Qué verás en las fotos',
          body: [
            'Los modelos a tamaño real de dinosaurios del Jurásico y el Cretácico: Tyrannosaurus rex, Triceratops, Diplodocus, Spinosaurus y más, con notas educativas junto a cada pieza.',
            'También aparecen la zona interactiva (excavaciones simuladas), las áreas familiares y el entorno del parque sobre la Circunvalación.',
          ],
        },
        {
          id: 'mejor-hora',
          title: 'Mejor hora para fotografiar',
          body: [
            'La luz dorada al amanecer o poco antes del cierre es la más suave y favorece las fotos; evita el mediodía, cuando el sol es fuerte y las sombras duras.',
            'Los días de semana temprano suelen tener menos gente, ideal para fotos generales sin multitudes.',
          ],
        },
        {
          id: 'consejos',
          title: 'Consejos de fotografía',
          body: [
            'Lleva un gran angular para las panorámicas de los modelos grandes y un teleobjetivo para los detalles.',
            'Respeta las reglas del lugar si usas trípode en horas concurridas, y protege tu equipo si hay lluvia por la tarde.',
          ],
        },
      ],
      faq: [
        {
          q: '¿Se puede volar un dron en el parque?',
          a: 'Las reglas sobre drones pueden variar; sigue los avisos vigentes del parque y, de ser necesario, solicita permiso antes de volar.',
        },
        {
          q: '¿Cuáles son los modelos más fotografiados?',
          a: 'El Tyrannosaurus rex, el Triceratops y el Spinosaurus son los favoritos, junto con las escenas de excavación interactiva.',
        },
        {
          q: '¿Las fotos son de libre uso?',
          a: 'Las imágenes de este sitio pertenecen a sus respectivos fotógrafos; para uso comercial o publicación, contacta a los autores originales.',
        },
      ],
    },
    en: {
      h1: 'Photos of the Dinosaur Park in Orizaba',
      intro:
        'Expo Dinosaur Park is one of the most photographed spots in Orizaba: life-size models, an interactive zone and lots of open space. Below you can browse the gallery and find a few tips for your own photos.',
      sections: [
        {
          id: 'que-veras',
          title: 'What you will see in the photos',
          body: [
            'Life-size Jurassic and Cretaceous dinosaur models: Tyrannosaurus rex, Triceratops, Diplodocus, Spinosaurus and more, each with an educational note.',
            'You will also see the interactive zone (simulated digs), the family areas and the park’s setting along Circunvalación.',
          ],
        },
        {
          id: 'mejor-hora',
          title: 'Best time to photograph',
          body: [
            'Golden light at sunrise or just before closing is the softest and most flattering; avoid midday, when the sun is harsh and shadows are strong.',
            'Early on weekdays tends to be less crowded, ideal for crowd-free wide shots.',
          ],
        },
        {
          id: 'consejos',
          title: 'Photography tips',
          body: [
            'Bring a wide lens for big-model panoramas and a telephoto for details.',
            'Respect site rules if you use a tripod at busy times, and protect your gear if afternoon rain comes.',
          ],
        },
      ],
      faq: [
        {
          q: 'Can I fly a drone in the park?',
          a: 'Drone rules may vary; follow the park’s current notices and, if needed, request permission before flying.',
        },
        {
          q: 'Which models are the most photographed?',
          a: 'The Tyrannosaurus rex, Triceratops and Spinosaurus are the favourites, along with the interactive dig scenes.',
        },
        {
          q: 'Are the photos free to use?',
          a: 'Images on this site belong to their respective photographers; for commercial use or publication, contact the original authors.',
        },
      ],
    },
    zh: {
      h1: '奥里萨巴恐龙公园照片',
      intro:
        'Expo 恐龙公园是奥里萨巴最受拍照欢迎的地点之一：真实尺寸的模型、互动体验区与大量开阔空间。下方可浏览相册，并参考一些拍照建议。',
      sections: [
        {
          id: 'que-veras',
          title: '照片中会看到什么',
          body: [
            '侏罗纪与白垩纪真实尺寸的恐龙模型：暴龙、三角龙、雷龙、棘龙等，每件作品旁都有科普说明。',
            '还会看到互动体验区（模拟挖掘）、家庭活动区，以及公园位于 Circunvalación 一带的环境。',
          ],
        },
        {
          id: 'mejor-hora',
          title: '最佳拍摄时间',
          body: [
            '日出或闭园前的黄金光线最柔和、最上镜；请避开正午，此时阳光强烈、阴影生硬。',
            '工作日上午人潮较少，适合拍摄无人干扰的全景。',
          ],
        },
        {
          id: 'consejos',
          title: '拍照建议',
          body: [
            '带广角镜头拍摄大型模型全景，用长焦捕捉细节。',
            '高峰时段使用三脚架请遵守园区规定；若有午后阵雨，请保护好器材。',
          ],
        },
      ],
      faq: [
        {
          q: '可以在公园飞无人机吗？',
          a: '无人机规定可能变动；请遵守园区最新公告，必要时先申请许可再飞行。',
        },
        {
          q: '哪些模型最上镜？',
          a: '暴龙、三角龙与棘龙最受欢迎，互动挖掘场景也很受喜爱。',
        },
        {
          q: '照片可以免费使用吗？',
          a: '本站图片归各自摄影师所有；如需商用或公开发布，请联系原作者。',
        },
      ],
    },
  },

  'visitar-con-ninos': {
    es: {
      h1: 'Visita al Parque de los Dinosaurios con Niños en Orizaba',
      intro:
        'El Expo Parque de los Dinosaurios es una de las opciones familiares más populares de Orizaba. Aquí tienes por qué les encanta a los niños, consejos prácticos y atracciones cercanas para combinar en el mismo día.',
      sections: [
        {
          id: 'por-que',
          title: 'Por qué a los niños les encanta',
          body: [
            'Los modelos a tamaño real despiertan la curiosidad: T. rex, Triceratops y compañía son fáciles de reconocer y emocionan a los más pequeños.',
            'La zona interactiva con excavaciones simuladas y cuestionarios los mantiene entretenidos mientras aprenden sobre la era de los dinosaurios.',
          ],
        },
        {
          id: 'consejos',
          title: 'Consejos para familias',
          body: [
            'Lleva protección solar, agua y toallitas; la mayoría del recorrido es al aire libre y puede llover por la tarde.',
            'Usa ropa y calzado cómodos, y planea descansos en las áreas de sombra. Un paraguas plegable ligero es útil en temporada de lluvias.',
          ],
        },
        {
          id: 'cercanos',
          title: 'Atracciones cercanas para niños',
          body: [
            'Justo al lado está el Parque de las Sonrisas, con áreas de juego con temática de mini ciudad, ideal para los más pequeños.',
            'El Eco parque Cerro de la Escamela, sobre la Circunvalación, ofrece juegos infantiles y senderos; el Teleférico de Orizaba es otra opción panorámica para la familia.',
          ],
        },
        {
          id: 'plan',
          title: 'Plan de medio día en familia',
          body: [
            'Empiecen por los dinosaurios grandes y fáciles de reconocer, prueben la excavación simulada y entrelacen explicaciones breves.',
            'Descansen y merienden en el área de descanso, y cierren con fotos en su modelo favorito antes de ir a jugar al Parque de las Sonrisas.',
          ],
        },
      ],
      faq: [
        {
          q: '¿El parque es apto para niños pequeños?',
          a: 'Sí. El recorrido principal es plano y está pensado para familias; los modelos y la zona interactiva gustan mucho a los niños. Supervisa a los menores cerca de las barreras.',
        },
        {
          q: '¿Se puede llevar coche de bebé?',
          a: 'El circuito principal es accesible y plano, así que los coches de bebé suelen manejarse bien; confirma los caminos accesibles en el lugar.',
        },
        {
          q: '¿Cuánto tiempo conviene dedicarle en familia?',
          a: 'Unas 3–4 horas son suficientes para disfrutar los modelos y la zona interactiva sin prisa; una visita completa con descansos puede llegar a 5–6 horas.',
        },
        {
          q: '¿Hay comida dentro del parque?',
          a: 'Alrededor del parque hay puestos de comida y restaurantes locales; también puedes llevar tu propia agua y snacks donde las reglas del parque lo permitan.',
        },
      ],
    },
    en: {
      h1: 'Visiting the Dinosaur Park with Kids in Orizaba',
      intro:
        'Expo Dinosaur Park is one of the most popular family options in Orizaba. Here is why kids love it, practical tips, and nearby attractions to combine on the same day.',
      sections: [
        {
          id: 'por-que',
          title: 'Why kids love it',
          body: [
            'The life-size models spark curiosity: T. rex, Triceratops and friends are easy to recognise and thrill little ones.',
            'The interactive zone with simulated digs and quizzes keeps them entertained while they learn about the age of dinosaurs.',
          ],
        },
        {
          id: 'consejos',
          title: 'Tips for families',
          body: [
            'Bring sun protection, water and wipes; most of the route is outdoors and afternoon rain is possible.',
            'Wear comfortable clothes and shoes, plan shade breaks, and a light foldable umbrella helps in the rainy season.',
          ],
        },
        {
          id: 'cercanos',
          title: 'Nearby kid-friendly attractions',
          body: [
            'Right next door is Parque de las Sonrisas, with miniature-city themed play areas, ideal for younger children.',
            'Eco parque Cerro de la Escamela, along Circunvalación, has children’s play areas and trails; the Orizaba cable car is another panoramic family option.',
          ],
        },
        {
          id: 'plan',
          title: 'Half-day family plan',
          body: [
            'Start with the big, easy-to-recognise dinosaurs, try the simulated dig, and weave in short explanations.',
            'Rest and snack in the rest area, and finish with photos at a favourite model before heading to play at Parque de las Sonrisas.',
          ],
        },
      ],
      faq: [
        {
          q: 'Is the park suitable for small children?',
          a: 'Yes. The main loop is flat and designed for families; the models and interactive zone are big hits with kids. Supervise children near the barriers.',
        },
        {
          q: 'Can I bring a stroller?',
          a: 'The main loop is accessible and flat, so strollers generally work well; confirm accessible paths on site.',
        },
        {
          q: 'How long should we plan for as a family?',
          a: 'About 3–4 hours is enough to enjoy the models and interactive zone at a relaxed pace; a full visit with breaks can reach 5–6 hours.',
        },
        {
          q: 'Is there food inside the park?',
          a: 'Around the park there are food stalls and local restaurants; you can also bring your own water and snacks where park rules allow.',
        },
      ],
    },
    zh: {
      h1: '带小孩游览奥里萨巴恐龙公园',
      intro:
        'Expo 恐龙公园是奥里萨巴最受欢迎的家庭景点之一。以下说明孩子为何喜欢、实用建议，以及可在同一天顺游的邻近亲子景点。',
      sections: [
        {
          id: 'por-que',
          title: '孩子为何喜欢',
          body: [
            '真实尺寸的模型激发好奇心：暴龙、三角龙等容易辨认，让小朋友兴奋不已。',
            '模拟挖掘与问答等互动体验区，让孩子在玩乐中认识恐龙时代。',
          ],
        },
        {
          id: 'consejos',
          title: '家庭建议',
          body: [
            '请携带防晒、饮水与湿纸巾；大部分步道在户外，午后可能有雨。',
            '穿舒适衣物与鞋子，安排遮荫休息；雨季带一把轻便折叠伞很实用。',
          ],
        },
        {
          id: 'cercanos',
          title: '邻近亲子景点',
          body: [
            '紧邻公园的是笑颜公园（Parque de las Sonrisas），有迷你城市主题的游乐区，适合幼儿。',
            '位于 Circunvalación 沿线的 Cerro de la Escamela 生态公园有儿童游乐设施与步道；奥里萨巴缆车是另一项全家可享的全景观光选择。',
          ],
        },
        {
          id: 'plan',
          title: '半日家庭行程',
          body: [
            '从容易辨认的大型恐龙开始，体验模拟挖掘，并穿插简短的解说。',
            '在休息区吃点心，最后在最喜欢的模型前拍照，再前往笑颜公园游玩。',
          ],
        },
      ],
      faq: [
        {
          q: '公园适合幼儿吗？',
          a: '适合。主步道平坦、专为家庭设计；模型与互动区深受孩子喜爱。请在护栏附近看管好小孩。',
        },
        {
          q: '可以推婴儿车吗？',
          a: '主步道平坦且无障碍，婴儿车通常可行；无障碍路线请以现场为准。',
        },
        {
          q: '全家游览建议预留多久？',
          a: '约 3–4 小时即可从容欣赏模型与互动区；含休息的完整游览可达 5–6 小时。',
        },
        {
          q: '公园内有餐饮吗？',
          a: '公园周边有小吃摊与当地餐厅；在园区规定允许的范围内，也可自备饮水与零食。',
        },
      ],
    },
  },
};

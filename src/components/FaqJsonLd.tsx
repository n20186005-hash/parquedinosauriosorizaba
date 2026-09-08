import { getMessages } from 'next-intl/server';

/**
 * FAQPage 结构化数据（仅在首页输出）。
 * 文案直接取自当前语言包中可见的 FAQ 正文，保证
 * 结构化数据与页面内容一一对应，避免在无 FAQ 正文的子页面输出不匹配富摘要。
 */
export default async function FaqJsonLd() {
  const messages = (await getMessages()) as {
    faq?: { items?: { q: string; a: string }[] };
  };
  const items = messages?.faq?.items ?? [];
  if (items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

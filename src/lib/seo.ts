import { Metadata } from 'next';

const BASE_URL = 'https://youtubecreatorhub.vercel.app';
const SITE_NAME = 'CreatorToolsHub';

export function constructToolMetadata(
  toolOrName: any,
  metaDescription?: string,
  slug?: string
): Metadata {
  const name = typeof toolOrName === 'object' ? toolOrName.name : toolOrName;
  const desc = typeof toolOrName === 'object' ? toolOrName.metaDescription : metaDescription;
  const s = typeof toolOrName === 'object' ? toolOrName.slug : slug;
  const url = `${BASE_URL}/tools/${s}`;
  const title = `${name} — Free Online YouTube Tool | ${SITE_NAME}`;

  return {
    title,
    description: desc,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: SITE_NAME,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc
    }
  };
}

export function constructArticleMetadata(
  articleOrTitle: any,
  metaDescription?: string,
  slug?: string
): Metadata {
  const title = typeof articleOrTitle === 'object' ? articleOrTitle.title : articleOrTitle;
  const desc = typeof articleOrTitle === 'object' ? articleOrTitle.metaDescription : metaDescription;
  const s = typeof articleOrTitle === 'object' ? articleOrTitle.slug : slug;
  const url = `${BASE_URL}/blog/${s}`;
  const pageTitle = `${title} | ${SITE_NAME} Blog`;

  return {
    title: pageTitle,
    description: metaDescription,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: pageTitle,
      description: metaDescription,
      url,
      siteName: SITE_NAME,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: metaDescription
    }
  };
}

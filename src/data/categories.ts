export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  badge?: string;
}

export const CATEGORIES: ToolCategory[] = [
  {
    id: 'thumbnails',
    name: 'Thumbnails',
    description: 'Download, inspect sizes, and preview thumbnails across YouTube desktop and mobile environments.',
    icon: 'Image',
    badge: '3 Tools'
  },
  {
    id: 'titles-descriptions',
    name: 'Titles & Descriptions',
    description: 'Craft high-CTR video titles, comprehensive descriptions, tags, hashtags, and audit lengths.',
    icon: 'FileText',
    badge: '6 Tools'
  },
  {
    id: 'keywords-seo',
    name: 'Keywords & SEO',
    description: 'Generate long-tail keyword angles, combine keywords, plan A/B titles, and audit complete SEO checklists.',
    icon: 'Search',
    badge: '4 Tools'
  },
  {
    id: 'earnings-analytics',
    name: 'Earnings & Analytics',
    description: 'Forecast AdSense RPM, track monetization progress, benchmark engagement rate, and analyze channel metrics.',
    icon: 'DollarSign',
    badge: '6 Tools'
  },
  {
    id: 'shorts',
    name: 'YouTube Shorts',
    description: 'Hook formulas for short-form retention, punchy short titles, viral hashtag bundles, and video concepts.',
    icon: 'Zap',
    badge: '4 Tools'
  },
  {
    id: 'planning-content',
    name: 'Planning & Content',
    description: 'Structure automated timestamps/chapters, schedule monthly release calendars, and draft script outlines.',
    icon: 'Calendar',
    badge: '3 Tools'
  },
  {
    id: 'creator-utilities',
    name: 'Creator Utilities',
    description: 'Compute brand sponsorship rates, channel collaboration value, clean embeds, channel names, and URL parser.',
    icon: 'Wrench',
    badge: '9 Tools'
  }
];

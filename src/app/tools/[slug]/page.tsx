import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { TOOLS } from '@/data/tools';
import { constructToolMetadata } from '@/lib/seo';
import ToolLayout from '@/components/tools/ToolLayout';
import RelatedTools from '@/components/tools/RelatedTools';

// Tool Instances
import { ThumbnailDownloaderTool } from '@/components/tools/instances/ThumbnailDownloaderTool';
import { ThumbnailPreviewTool } from '@/components/tools/instances/ThumbnailPreviewTool';
import { ThumbnailSizeCheckerTool } from '@/components/tools/instances/ThumbnailSizeCheckerTool';
import { TitleGeneratorTool } from '@/components/tools/instances/TitleGeneratorTool';
import { DescriptionGeneratorTool } from '@/components/tools/instances/DescriptionGeneratorTool';
import { TagGeneratorTool } from '@/components/tools/instances/TagGeneratorTool';
import { HashtagGeneratorTool } from '@/components/tools/instances/HashtagGeneratorTool';
import { TitleLengthCheckerTool } from '@/components/tools/instances/TitleLengthCheckerTool';
import { DescriptionLengthCheckerTool } from '@/components/tools/instances/DescriptionLengthCheckerTool';
import { KeywordGeneratorTool } from '@/components/tools/instances/KeywordGeneratorTool';
import { KeywordCombinationTool } from '@/components/tools/instances/KeywordCombinationTool';
import { SeoChecklistTool } from '@/components/tools/instances/SeoChecklistTool';
import { TitleAbGeneratorTool } from '@/components/tools/instances/TitleAbGeneratorTool';
import { EarningsCalculatorTool } from '@/components/tools/instances/EarningsCalculatorTool';
import { MonetizationCalculatorTool } from '@/components/tools/instances/MonetizationCalculatorTool';
import { EngagementRateCalculatorTool } from '@/components/tools/instances/EngagementRateCalculatorTool';
import { ChannelStatisticsTool } from '@/components/tools/instances/ChannelStatisticsTool';
import { CpmRpmCalculatorTool } from '@/components/tools/instances/CpmRpmCalculatorTool';
import { WatchTimeCalculatorTool } from '@/components/tools/instances/WatchTimeCalculatorTool';
import { ShortsTitleGeneratorTool } from '@/components/tools/instances/ShortsTitleGeneratorTool';
import { ShortsHookGeneratorTool } from '@/components/tools/instances/ShortsHookGeneratorTool';
import { ShortsHashtagGeneratorTool } from '@/components/tools/instances/ShortsHashtagGeneratorTool';
import { VideoIdeaGeneratorTool } from '@/components/tools/instances/VideoIdeaGeneratorTool';
import { ChapterGeneratorTool } from '@/components/tools/instances/ChapterGeneratorTool';
import { ContentCalendarGeneratorTool } from '@/components/tools/instances/ContentCalendarGeneratorTool';
import { ScriptOutlineGeneratorTool } from '@/components/tools/instances/ScriptOutlineGeneratorTool';
import { SponsorshipCalculatorTool } from '@/components/tools/instances/SponsorshipCalculatorTool';
import { CollaborationValueCalculatorTool } from '@/components/tools/instances/CollaborationValueCalculatorTool';
import { ChannelNameGeneratorTool } from '@/components/tools/instances/ChannelNameGeneratorTool';
import { BioGeneratorTool } from '@/components/tools/instances/BioGeneratorTool';
import { PlaylistNameGeneratorTool } from '@/components/tools/instances/PlaylistNameGeneratorTool';
import { PinnedCommentGeneratorTool } from '@/components/tools/instances/PinnedCommentGeneratorTool';
import { UploadChecklistTool } from '@/components/tools/instances/UploadChecklistTool';
import { EmbedCodeGeneratorTool } from '@/components/tools/instances/EmbedCodeGeneratorTool';
import UrlParserTool from '@/components/tools/instances/UrlParserTool';

const toolComponentMap: Record<string, React.ComponentType> = {
  'youtube-thumbnail-downloader': ThumbnailDownloaderTool,
  'youtube-thumbnail-preview': ThumbnailPreviewTool,
  'youtube-thumbnail-size-checker': ThumbnailSizeCheckerTool,
  'youtube-title-generator': TitleGeneratorTool,
  'youtube-description-generator': DescriptionGeneratorTool,
  'youtube-tag-generator': TagGeneratorTool,
  'youtube-hashtag-generator': HashtagGeneratorTool,
  'youtube-title-length-checker': TitleLengthCheckerTool,
  'youtube-description-length-checker': DescriptionLengthCheckerTool,
  'youtube-keyword-tool': KeywordGeneratorTool,
  'youtube-keyword-combination-tool': KeywordCombinationTool,
  'youtube-seo-checklist': SeoChecklistTool,
  'youtube-title-ab-testing-generator': TitleAbGeneratorTool,
  'youtube-earnings-calculator': EarningsCalculatorTool,
  'youtube-monetization-checker': MonetizationCalculatorTool,
  'youtube-engagement-rate-calculator': EngagementRateCalculatorTool,
  'youtube-channel-statistics': ChannelStatisticsTool,
  'youtube-cpm-rpm-calculator': CpmRpmCalculatorTool,
  'youtube-watch-time-calculator': WatchTimeCalculatorTool,
  'youtube-shorts-title-generator': ShortsTitleGeneratorTool,
  'youtube-shorts-hook-generator': ShortsHookGeneratorTool,
  'youtube-shorts-hashtag-generator': ShortsHashtagGeneratorTool,
  'youtube-video-idea-generator': VideoIdeaGeneratorTool,
  'youtube-timestamp-generator': ChapterGeneratorTool,
  'youtube-content-calendar-generator': ContentCalendarGeneratorTool,
  'youtube-script-outline-generator': ScriptOutlineGeneratorTool,
  'youtube-sponsorship-calculator': SponsorshipCalculatorTool,
  'youtube-collaboration-value-calculator': CollaborationValueCalculatorTool,
  'youtube-channel-name-generator': ChannelNameGeneratorTool,
  'youtube-channel-bio-generator': BioGeneratorTool,
  'youtube-playlist-name-generator': PlaylistNameGeneratorTool,
  'youtube-pinned-comment-generator': PinnedCommentGeneratorTool,
  'youtube-upload-checklist': UploadChecklistTool,
  'youtube-embed-code-generator': EmbedCodeGeneratorTool,
  'youtube-url-parser-link-generator': UrlParserTool,
};

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) return {};
  return constructToolMetadata(tool);
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = toolComponentMap[tool.slug];

  // Schema.org WebApplication & FAQPage JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: tool.name,
        description: tool.metaDescription,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: tool.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout
        toolName={tool.name}
        categoryName={tool.categoryName}
        categorySlug={tool.category}
        shortDescription={tool.shortDescription}
        howToUseSteps={tool.howToUseSteps}
        aboutContent={tool.longDescription}
        faqs={tool.faqs}
      >
        {ToolComponent ? (
          <ToolComponent />
        ) : (
          <div className="p-8 text-center bg-surface-card border border-surface-border rounded-2xl text-text-muted">
            Tool under active development.
          </div>
        )}
        <RelatedTools slugs={tool.relatedToolSlugs} />
      </ToolLayout>
    </>
  );
}

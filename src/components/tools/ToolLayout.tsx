import React from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

interface ToolLayoutProps {
  toolName: string;
  categoryName: string;
  categorySlug: string;
  shortDescription: string;
  howToUseSteps: string[];
  aboutContent: string;
  faqs: { question: string; answer: string }[];
  children: React.ReactNode;
}

export function ToolLayout({
  toolName,
  categoryName,
  categorySlug,
  shortDescription,
  howToUseSteps,
  aboutContent,
  faqs,
  children,
}: ToolLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Tools', href: '/tools' },
          { label: categoryName, href: `/tools?category=${categorySlug}` },
          { label: toolName },
        ]}
      />

      {/* Tool Header */}
      <header className="mb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 text-[#7C5CFC] text-xs font-semibold uppercase tracking-wider mb-2">
          {categoryName}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F0F0F5] tracking-tight mb-2">
          {toolName}
        </h1>
        <p className="text-sm text-[#9090A8] max-w-3xl leading-relaxed">
          {shortDescription}
        </p>
      </header>

      {/* Interactive Tool Interface Area */}
      <div className="p-5 sm:p-7 rounded-2xl bg-[#161620] border border-[#242436] shadow-xl shadow-black/20 mb-12">
        {children}
      </div>

      {/* Educational & SEO Content Sections */}
      <div className="space-y-12">
        
        {/* Section 1: How to Use */}
        <section className="p-6 rounded-2xl bg-[#12121A] border border-[#242436]">
          <h2 className="text-xl font-bold text-[#F0F0F5] mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[#7C5CFC]/20 text-[#7C5CFC] flex items-center justify-center text-xs">
              ✓
            </span>
            How to Use {toolName}
          </h2>
          <ol className="space-y-3">
            {howToUseSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#9090A8] leading-relaxed">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1A1A24] border border-[#2A2A3A] text-[#F0F0F5] flex items-center justify-center text-xs font-semibold">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Section 2: About This Tool */}
        <section className="p-6 rounded-2xl bg-[#12121A] border border-[#242436]">
          <h2 className="text-xl font-bold text-[#F0F0F5] mb-3">
            About {toolName}
          </h2>
          <div className="text-xs sm:text-sm text-[#9090A8] leading-relaxed space-y-3">
            <p>{aboutContent}</p>
          </div>
        </section>

        {/* Section 3: Frequently Asked Questions */}
        {faqs.length > 0 && (
          <section className="p-6 rounded-2xl bg-[#12121A] border border-[#242436]">
            <h2 className="text-xl font-bold text-[#F0F0F5] mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#161620] border border-[#242436]">
                  <h3 className="text-sm font-semibold text-[#F0F0F5] mb-1.5">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9090A8] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

export default ToolLayout;

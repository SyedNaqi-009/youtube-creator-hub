'use client';

import React, { useState } from 'react';
import { generateDescription } from '@/lib/tool-logic';
import { CopyButton } from '@/components/ui/CopyButton';
import { FileText, Trash2, CheckCircle2 } from 'lucide-react';

export function DescriptionGeneratorTool() {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [links, setLinks] = useState('');
  const [ctaType, setCtaType] = useState('Subscribe');
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const [includeAffiliate, setIncludeAffiliate] = useState(false);
  const [generatedText, setGeneratedText] = useState('');

  const handleGenerate = () => {
    const text = generateDescription({
      title,
      topic,
      keyPoints,
      links,
      ctaType,
      includeTimestamps,
      includeAffiliate,
    });
    setGeneratedText(text);
  };

  const charCount = generatedText.length;
  const isOverLimit = charCount > 5000;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Video Title (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. 10 Mistakes Every Creator Makes"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Primary Subject / Topic *
          </label>
          <input
            type="text"
            placeholder="e.g. YouTube Video Editing Workflow"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
          Key Points to Cover (One per line)
        </label>
        <textarea
          rows={3}
          placeholder="How to cut clips faster&#10;Color grading secrets&#10;Audio sound design"
          value={keyPoints}
          onChange={(e) => setKeyPoints(e.target.value)}
          className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] placeholder-[#606078] focus:outline-none focus:border-[#7C5CFC]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Call to Action (CTA)
          </label>
          <select
            value={ctaType}
            onChange={(e) => setCtaType(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          >
            <option value="Subscribe">Subscribe & Notification Bell</option>
            <option value="Like & Comment">Like & Comment Prompt</option>
            <option value="Visit Website">Visit External Website / Portfolio</option>
            <option value="Follow Social Media">Follow on Social Channels</option>
            <option value="Check Playlist">Watch Series Playlist</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Custom Links / Socials
          </label>
          <input
            type="text"
            placeholder="e.g. Instagram: @handle | Website: link.com"
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-4 pt-2">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-[#F0F0F5]">
          <input
            type="checkbox"
            checked={includeTimestamps}
            onChange={(e) => setIncludeTimestamps(e.target.checked)}
            className="rounded border-[#2A2A3A] text-[#7C5CFC] focus:ring-[#7C5CFC]"
          />
          <span>Include Chapters / Timestamps section</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-xs text-[#F0F0F5]">
          <input
            type="checkbox"
            checked={includeAffiliate}
            onChange={(e) => setIncludeAffiliate(e.target.checked)}
            className="rounded border-[#2A2A3A] text-[#7C5CFC] focus:ring-[#7C5CFC]"
          />
          <span>Include FTC Affiliate Disclosure disclaimer</span>
        </label>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          type="button"
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-xs font-semibold hover:opacity-90 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          <span>Generate Structured Description</span>
        </button>
      </div>

      {generatedText && (
        <div className="pt-6 border-t border-[#242436] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#F0F0F5]">
              Generated Description
            </h3>
            <span className={`text-xs font-mono ${isOverLimit ? 'text-[#FF5C5C]' : 'text-[#9090A8]'}`}>
              {charCount} / 5,000 characters
            </span>
          </div>

          <textarea
            rows={10}
            value={generatedText}
            onChange={(e) => setGeneratedText(e.target.value)}
            className="w-full p-4 text-xs font-mono bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC] leading-relaxed"
          />

          <div className="flex items-center justify-between">
            <CopyButton text={generatedText} label="Copy Complete Description" />
            <button
              onClick={() => setGeneratedText('')}
              type="button"
              className="text-xs text-[#9090A8] hover:text-[#FF5C5C] flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { generateKeywordIdeas } from '@/lib/tool-logic';
import { CopyButton } from '@/components/ui/CopyButton';
import { Search, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

export function KeywordGeneratorTool() {
  const [seed, setSeed] = useState('');
  const [ideas, setIdeas] = useState<{
    questions: string[];
    howTo: string[];
    comparisons: string[];
    longTail: string[];
  } | null>(null);

  const handleGenerate = () => {
    if (!seed.trim()) return;
    const res = generateKeywordIdeas(seed);
    setIdeas(res);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
          Seed Keyword or Niche Topic *
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="e.g. Mechanical Keyboards, Notion Setup, Drone Photography"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className="flex-1 px-4 py-2.5 text-sm bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] placeholder-[#606078] focus:outline-none focus:border-[#7C5CFC]"
          />
          <button
            onClick={handleGenerate}
            type="button"
            disabled={!seed.trim()}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Expand Keyword Ideas</span>
          </button>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-[#12121A] border border-[#242436] text-xs text-[#9090A8]">
        <strong className="text-[#F0F0F5]">Transparent Methodology:</strong> These suggestions are formula-driven semantic expansions based on real-world search query formats (questions, comparison intents, tutorials). We do not display fabricated search volumes or fake competition bars.
      </div>

      {ideas && (
        <div className="pt-6 border-t border-[#242436] space-y-6">
          {/* Questions */}
          <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-[#7C5CFC] uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>Question Searches (High CTR)</span>
              </h4>
              <CopyButton text={ideas.questions.join('\n')} label="Copy Group" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ideas.questions.map((kw, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-[#161620] border border-[#242436] flex items-center justify-between text-xs text-[#F0F0F5]">
                  <span>{kw}</span>
                  <CopyButton text={kw} />
                </div>
              ))}
            </div>
          </div>

          {/* How-To */}
          <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-[#00D4AA] uppercase tracking-wider flex items-center gap-1.5">
                <ArrowRight className="w-4 h-4" />
                <span>How-To & Practical Walkthroughs</span>
              </h4>
              <CopyButton text={ideas.howTo.join('\n')} label="Copy Group" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ideas.howTo.map((kw, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-[#161620] border border-[#242436] flex items-center justify-between text-xs text-[#F0F0F5]">
                  <span>{kw}</span>
                  <CopyButton text={kw} />
                </div>
              ))}
            </div>
          </div>

          {/* Comparisons */}
          <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-[#FFB547] uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-4 h-4" />
                <span>Comparisons & Alternatives</span>
              </h4>
              <CopyButton text={ideas.comparisons.join('\n')} label="Copy Group" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ideas.comparisons.map((kw, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-[#161620] border border-[#242436] flex items-center justify-between text-xs text-[#F0F0F5]">
                  <span>{kw}</span>
                  <CopyButton text={kw} />
                </div>
              ))}
            </div>
          </div>

          {/* Long-Tail */}
          <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-[#F0F0F5] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#7C5CFC]" />
                <span>Long-Tail Specific Intent</span>
              </h4>
              <CopyButton text={ideas.longTail.join('\n')} label="Copy Group" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ideas.longTail.map((kw, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-[#161620] border border-[#242436] flex items-center justify-between text-xs text-[#F0F0F5]">
                  <span>{kw}</span>
                  <CopyButton text={kw} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

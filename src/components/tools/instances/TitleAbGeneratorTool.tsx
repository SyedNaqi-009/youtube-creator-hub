'use client';

import React, { useState } from 'react';
import { generateABTitlePairs } from '@/lib/tool-logic';
import { CopyButton } from '@/components/ui/CopyButton';
import { Split, Sparkles } from 'lucide-react';

export function TitleAbGeneratorTool() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [pairs, setPairs] = useState<{ label: string; titleA: string; titleB: string }[]>([]);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const res = generateABTitlePairs(topic, audience);
    setPairs(res);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Video Subject / Topic *
          </label>
          <input
            type="text"
            placeholder="e.g. Notion Productivity System"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Target Audience (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. College Students, Entrepreneurs"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        type="button"
        disabled={!topic.trim()}
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center gap-2"
      >
        <Split className="w-4 h-4" />
        <span>Generate A/B Test Variations</span>
      </button>

      {pairs.length > 0 && (
        <div className="pt-6 border-t border-[#242436] space-y-4">
          <h3 className="text-sm font-semibold text-[#F0F0F5]">
            Psychological Angle Split Pairs ({pairs.length})
          </h3>

          <div className="space-y-4">
            {pairs.map((p, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#12121A] border border-[#242436] space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C5CFC]">
                  {p.label}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option A */}
                  <div className="p-3 rounded-lg bg-[#161620] border border-[#2A2A3A] flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-[#00D4AA] font-bold mb-1">
                        <span>OPTION A</span>
                        <span className="font-mono text-[#9090A8]">{p.titleA.length} chars</span>
                      </div>
                      <p className="text-xs font-medium text-[#F0F0F5] leading-snug">
                        {p.titleA}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#242436] flex justify-end">
                      <CopyButton text={p.titleA} label="Copy A" />
                    </div>
                  </div>

                  {/* Option B */}
                  <div className="p-3 rounded-lg bg-[#161620] border border-[#2A2A3A] flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-[#FFB547] font-bold mb-1">
                        <span>OPTION B</span>
                        <span className="font-mono text-[#9090A8]">{p.titleB.length} chars</span>
                      </div>
                      <p className="text-xs font-medium text-[#F0F0F5] leading-snug">
                        {p.titleB}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#242436] flex justify-end">
                      <CopyButton text={p.titleB} label="Copy B" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

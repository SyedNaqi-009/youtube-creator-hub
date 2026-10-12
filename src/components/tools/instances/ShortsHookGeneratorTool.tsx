'use client';

import React, { useState } from 'react';
import { generateShortsHooks } from '@/lib/tool-logic';
import { CopyButton } from '@/components/ui/CopyButton';
import { Flame, Lightbulb, Sparkles } from 'lucide-react';

export function ShortsHookGeneratorTool() {
  const [topic, setTopic] = useState('');
  const [hookStyle, setHookStyle] = useState('Shocking Statement');
  const [hooks, setHooks] = useState<{ text: string; rationale: string }[]>([]);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const res = generateShortsHooks(topic, hookStyle);
    setHooks(res);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Shorts Video Topic / Premise *
          </label>
          <input
            type="text"
            placeholder="e.g. Waking up at 5 AM, Cold showers, Crypto mistake"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Psychological Hook Style
          </label>
          <select
            value={hookStyle}
            onChange={(e) => setHookStyle(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          >
            <option value="Shocking Statement">Shocking Statement / High Stakes</option>
            <option value="Question">Curiosity Question</option>
            <option value="Controversial Take">Controversial / Contrarian Take</option>
            <option value="Quick Tip">Quick Secret / Hack Opener</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        type="button"
        disabled={!topic.trim()}
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center gap-2"
      >
        <Flame className="w-4 h-4 text-[#FFB547]" />
        <span>Generate 3-Second Hooks</span>
      </button>

      {hooks.length > 0 && (
        <div className="pt-6 border-t border-[#242436] space-y-4">
          <h3 className="text-sm font-semibold text-[#F0F0F5]">
            Scroll-Stopping Opening Hooks ({hooks.length})
          </h3>

          <div className="space-y-3">
            {hooks.map((h, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#12121A] border border-[#242436] space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold text-[#F0F0F5] leading-snug">
                    &ldquo;{h.text}&rdquo;
                  </p>
                  <CopyButton text={h.text} />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#00D4AA]">
                  <Lightbulb className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{h.rationale}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

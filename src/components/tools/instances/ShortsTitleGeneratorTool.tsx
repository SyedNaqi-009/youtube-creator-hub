'use client';

import React, { useState } from 'react';
import { generateShortsTitles } from '@/lib/tool-logic';
import { CopyButton } from '@/components/ui/CopyButton';
import { Zap, Sparkles } from 'lucide-react';

export function ShortsTitleGeneratorTool() {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('Tech');
  const [results, setResults] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const titles = generateShortsTitles(topic, niche);
    setResults(titles);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Shorts Video Topic / Concept *
          </label>
          <input
            type="text"
            placeholder="e.g. iPhone Hidden Feature, Quick Workout, Python Trick"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Niche Category
          </label>
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          >
            <option value="Tech">Tech & Gadgets</option>
            <option value="Productivity">Productivity & Life Hacks</option>
            <option value="Fitness">Fitness & Health</option>
            <option value="Gaming">Gaming & Clips</option>
            <option value="Business">Business & Wealth</option>
            <option value="Comedy">Comedy & Relatable</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        type="button"
        disabled={!topic.trim()}
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center gap-2"
      >
        <Zap className="w-4 h-4" />
        <span>Generate Punchy Shorts Titles</span>
      </button>

      {results.length > 0 && (
        <div className="pt-6 border-t border-[#242436] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#F0F0F5]">
              Shorts-Optimized Titles ({results.length})
            </h3>
            <span className="text-xs text-[#00D4AA]">Mobile Friendly (≤40 chars)</span>
          </div>

          <div className="space-y-2">
            {results.map((title, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#12121A] border border-[#242436] hover:border-[#7C5CFC]/60 flex items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#00D4AA] px-1.5 py-0.5 rounded bg-[#161620]">
                    {title.length}c
                  </span>
                  <span className="text-xs font-medium text-[#F0F0F5]">{title}</span>
                </div>
                <CopyButton text={title} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

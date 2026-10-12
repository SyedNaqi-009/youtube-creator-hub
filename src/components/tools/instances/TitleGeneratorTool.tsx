'use client';

import React, { useState } from 'react';
import { generateTitles } from '@/lib/tool-logic';
import { CopyButton } from '@/components/ui/CopyButton';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

export function TitleGeneratorTool() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [videoType, setVideoType] = useState('Tutorial');
  const [tone, setTone] = useState('Exciting');
  const [results, setResults] = useState<{ title: string; length: number; status: 'green' | 'yellow' | 'red' }[]>([]);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const titles = generateTitles(topic, audience, videoType, tone);
    setResults(titles);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Primary Video Topic / Seed Keyword *
          </label>
          <input
            type="text"
            placeholder="e.g. Video Editing, Morning Routine, Budget Travel"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] placeholder-[#606078] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Target Audience (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Beginners, Freelancers, Gamers, College Students"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] placeholder-[#606078] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Video Format
          </label>
          <select
            value={videoType}
            onChange={(e) => setVideoType(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          >
            <option value="Tutorial">Tutorial / How-To</option>
            <option value="Review">Product / Gear Review</option>
            <option value="Vlog">Vlog & Daily Life</option>
            <option value="List">Listicle / Top 10</option>
            <option value="Reaction">Reaction & Commentary</option>
            <option value="Challenge">Challenge / Experiment</option>
            <option value="Live Stream">Live Stream</option>
            <option value="Shorts">YouTube Shorts</option>
            <option value="Story">Storytime & Documentary</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Tone of Voice
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          >
            <option value="Exciting">Exciting & High Energy</option>
            <option value="Professional">Professional & Authoritative</option>
            <option value="Casual">Casual & Conversational</option>
            <option value="Mysterious">Mysterious / Curiosity Gap</option>
            <option value="Educational">Educational & Clear</option>
            <option value="Controversial">Controversial / Bold</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          type="button"
          disabled={!topic.trim()}
          className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Titles</span>
        </button>
      </div>

      {results.length > 0 && (
        <div className="pt-6 border-t border-[#242436] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#F0F0F5]">
              Generated Title Ideas ({results.length})
            </h3>
            <span className="text-xs text-[#9090A8]">
              Target: ≤60 chars for mobile
            </span>
          </div>

          <div className="space-y-2.5">
            {results.map((res, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#12121A] border border-[#242436] hover:border-[#7C5CFC]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#F0F0F5] leading-snug">
                    {res.title}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    res.status === 'green' ? 'bg-[#00D4AA]/20 text-[#00D4AA]' :
                    res.status === 'yellow' ? 'bg-[#FFB547]/20 text-[#FFB547]' :
                    'bg-[#FF5C5C]/20 text-[#FF5C5C]'
                  }`}>
                    {res.length} chars
                  </span>
                  <CopyButton text={res.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

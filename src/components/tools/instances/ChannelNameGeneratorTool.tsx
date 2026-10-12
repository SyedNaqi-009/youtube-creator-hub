'use client';

import React, { useState } from 'react';
import { generateChannelNames } from '@/lib/tool-logic';
import { CopyButton } from '@/components/ui/CopyButton';
import { AtSign, Sparkles } from 'lucide-react';

export function ChannelNameGeneratorTool() {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('Playful');
  const [names, setNames] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const res = generateChannelNames(topic, style);
    setNames(res);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Channel Theme / Keyword *
          </label>
          <input
            type="text"
            placeholder="e.g. Cinema, Code, Gamer, Craft"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Branding Style
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          >
            <option value="Playful">Playful & Catchy</option>
            <option value="Professional">Professional & Authority</option>
            <option value="Descriptive">Descriptive & Clean</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        type="button"
        disabled={!topic.trim()}
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center gap-2"
      >
        <AtSign className="w-4 h-4" />
        <span>Generate Channel Names</span>
      </button>

      {names.length > 0 && (
        <div className="pt-6 border-t border-[#242436] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#F0F0F5]">
              Generated Channel Ideas ({names.length})
            </h3>
            <span className="text-xs text-[#9090A8]">Verify availability directly on YouTube</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {names.map((name, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#12121A] border border-[#242436] hover:border-[#7C5CFC]/60 flex items-center justify-between gap-2 transition-colors"
              >
                <span className="text-xs font-semibold text-[#F0F0F5] truncate">{name}</span>
                <CopyButton text={name} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { generateHashtags } from '@/lib/tool-logic';
import { CopyButton } from '@/components/ui/CopyButton';
import { Hash, Check, Info } from 'lucide-react';

export function ShortsHashtagGeneratorTool() {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('Tech');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const res = generateHashtags(topic, true); // Shorts mode
    setHashtags(res);
    setSelected(res);
  };

  const toggle = (t: string) => {
    setSelected(selected.includes(t) ? selected.filter(x => x !== t) : [...selected, t]);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Shorts Topic / Focus *
          </label>
          <input
            type="text"
            placeholder="e.g. Life Hack, Morning Motivation, Coding Tip"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Category
          </label>
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          >
            <option value="Tech">Tech & Gaming</option>
            <option value="Fitness">Fitness & Wellness</option>
            <option value="Lifestyle">Lifestyle & Comedy</option>
            <option value="Education">Education & Finance</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        type="button"
        disabled={!topic.trim()}
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center gap-2"
      >
        <Hash className="w-4 h-4" />
        <span>Generate Shorts Hashtag Bundle</span>
      </button>

      {hashtags.length > 0 && (
        <div className="pt-6 border-t border-[#242436] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#F0F0F5]">
              Shorts Shelf Discovery Bundle ({selected.length} tags)
            </h3>
            <CopyButton text={selected.join(' ')} label="Copy Bundle" />
          </div>

          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag) => {
              const isSel = selected.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggle(tag)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                    isSel
                      ? 'bg-[#7C5CFC]/20 border-[#7C5CFC] text-[#F0F0F5]'
                      : 'bg-[#12121A] border-[#2A2A3A] text-[#9090A8] hover:border-[#606078]'
                  }`}
                >
                  {isSel && <Check className="w-3.5 h-3.5 text-[#00D4AA]" />}
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-lg bg-[#12121A] text-[11px] text-[#9090A8]">
            <strong className="text-[#00D4AA]">Placement Tip:</strong> Add <code>#Shorts</code> in your video title and the remaining 3-5 tags in your description to ensure maximum algorithmic indexing.
          </div>
        </div>
      )}
    </div>
  );
}

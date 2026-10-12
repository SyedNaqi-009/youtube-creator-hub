'use client';

import React, { useState } from 'react';
import { generateHashtags } from '@/lib/tool-logic';
import { CopyButton } from '@/components/ui/CopyButton';
import { Hash, Check, Info } from 'lucide-react';

export function HashtagGeneratorTool() {
  const [topic, setTopic] = useState('');
  const [isShorts, setIsShorts] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const tags = generateHashtags(topic, isShorts);
    setHashtags(tags);
    setSelected(tags.slice(0, 5)); // auto select recommended 3-5
  };

  const toggleTag = (tag: string) => {
    if (selected.includes(tag)) {
      setSelected(selected.filter(t => t !== tag));
    } else {
      setSelected([...selected, tag]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Video Topic / Niche *
          </label>
          <input
            type="text"
            placeholder="e.g. Fitness, Coding, Crypto"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Content Format
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setIsShorts(false)}
              type="button"
              className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                !isShorts
                  ? 'bg-[#7C5CFC] border-[#7C5CFC] text-white'
                  : 'bg-[#12121A] border-[#2A2A3A] text-[#9090A8]'
              }`}
            >
              Standard Long-Form
            </button>
            <button
              onClick={() => setIsShorts(true)}
              type="button"
              className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                isShorts
                  ? 'bg-[#7C5CFC] border-[#7C5CFC] text-white'
                  : 'bg-[#12121A] border-[#2A2A3A] text-[#9090A8]'
              }`}
            >
              YouTube Shorts
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        type="button"
        disabled={!topic.trim()}
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center gap-2"
      >
        <Hash className="w-4 h-4" />
        <span>Generate YouTube Hashtags</span>
      </button>

      <div className="p-3.5 rounded-xl bg-[#12121A] border border-[#2A2A3A] flex items-start gap-2.5 text-xs text-[#9090A8]">
        <Info className="w-4 h-4 text-[#00D4AA] flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-[#F0F0F5]">YouTube Guideline:</strong> YouTube allows up to 60 hashtags, but explicitly recommends using 3 to 5 focused tags. Adding over 60 tags causes YouTube to ignore all hashtags on that video.
        </p>
      </div>

      {hashtags.length > 0 && (
        <div className="pt-6 border-t border-[#242436] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#F0F0F5]">
                Suggested Hashtags ({selected.length} selected)
              </h3>
              <p className="text-xs text-[#9090A8]">Click to select/deselect</p>
            </div>
            <CopyButton text={selected.join(' ')} label="Copy Selected" />
          </div>

          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag) => {
              const isSel = selected.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
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
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { ListMusic, Copy, Sparkles } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

export function PlaylistNameGeneratorTool() {
  const [topic, setTopic] = useState('');
  const [purpose, setPurpose] = useState('Tutorial Series');
  const [results, setResults] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const t = topic.trim();
    const clean = t.charAt(0).toUpperCase() + t.slice(1);

    const generated: string[] = [
      `${clean} Masterclass: Step-by-Step Series`,
      `Complete Guide to ${clean} (Start Here)`,
      `${clean} for Beginners: Complete Course`,
      `Advanced ${clean} Strategies & Deep Dives`,
      `The Ultimate ${clean} Roadmap`,
      `${clean} Tips, Tricks & Hacks`,
      `Best of ${clean} Collection`,
      `${clean} Case Studies & Real Results`,
      `${clean} Zero to Hero Bootcamp`,
      `Mastering ${clean}: The Complete Playbook`
    ];

    setResults(generated);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Playlist Subject / Video Group *
          </label>
          <input
            type="text"
            placeholder="e.g. Next.js 15, Portrait Photography, Budget Cooking"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Playlist Purpose
          </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          >
            <option value="Tutorial Series">Sequential Tutorial Series</option>
            <option value="Compilation">Best-of Compilation</option>
            <option value="Deep Dive">Advanced Deep Dives</option>
            <option value="Beginner">Beginner Onboarding Course</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        type="button"
        disabled={!topic.trim()}
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center gap-2"
      >
        <ListMusic className="w-4 h-4" />
        <span>Generate Playlist Names</span>
      </button>

      {results.length > 0 && (
        <div className="pt-6 border-t border-[#242436] space-y-3">
          <h3 className="text-sm font-semibold text-[#F0F0F5]">
            SEO-Friendly Playlist Names ({results.length})
          </h3>

          <div className="space-y-2">
            {results.map((name, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#12121A] border border-[#242436] hover:border-[#7C5CFC]/60 flex items-center justify-between gap-3 transition-colors"
              >
                <span className="text-xs font-medium text-[#F0F0F5]">{name}</span>
                <CopyButton text={name} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

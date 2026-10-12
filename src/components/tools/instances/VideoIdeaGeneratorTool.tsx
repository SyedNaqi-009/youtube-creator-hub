'use client';

import React, { useState } from 'react';
import { generateVideoIdeas } from '@/lib/tool-logic';
import { CopyButton } from '@/components/ui/CopyButton';
import { Lightbulb, Bookmark, BookmarkCheck, Sparkles } from 'lucide-react';

export function VideoIdeaGeneratorTool() {
  const [topic, setTopic] = useState('');
  const [format, setFormat] = useState('Tutorial');
  const [ideas, setIdeas] = useState<{ title: string; concept: string; format: string }[]>([]);
  const [savedTitles, setSavedTitles] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const res = generateVideoIdeas(topic, format);
    setIdeas(res);
  };

  const toggleSave = (title: string) => {
    if (savedTitles.includes(title)) {
      setSavedTitles(savedTitles.filter(t => t !== title));
    } else {
      setSavedTitles([...savedTitles, title]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Channel Niche or Topic *
          </label>
          <input
            type="text"
            placeholder="e.g. Home Gym, Web Development, Personal Finance"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Preferred Format Angle
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          >
            <option value="Tutorial">Practical Tutorial / Masterclass</option>
            <option value="Review">Hands-on Tool / Gear Review</option>
            <option value="Educational">Deep Dive / Industry Analysis</option>
            <option value="Challenge">Challenge / Sprint Experiment</option>
            <option value="Reaction">Reaction & Commentary</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        type="button"
        disabled={!topic.trim()}
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center gap-2"
      >
        <Lightbulb className="w-4 h-4 text-[#FFB547]" />
        <span>Generate Video Concepts</span>
      </button>

      {ideas.length > 0 && (
        <div className="pt-6 border-t border-[#242436] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#F0F0F5]">
              Structured Video Concepts ({ideas.length})
            </h3>
            <span className="text-xs text-[#9090A8]">
              {savedTitles.length} Saved to Favorites
            </span>
          </div>

          <div className="space-y-3">
            {ideas.map((idea, i) => {
              const isSaved = savedTitles.includes(idea.title);
              return (
                <div key={i} className="p-4 rounded-xl bg-[#12121A] border border-[#242436] space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#242436] text-[#7C5CFC] mb-1.5 inline-block">
                        {idea.format}
                      </span>
                      <h4 className="text-sm font-bold text-[#F0F0F5] leading-snug">
                        {idea.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSave(idea.title)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isSaved ? 'bg-[#FFB547]/20 border-[#FFB547] text-[#FFB547]' : 'border-[#2A2A3A] text-[#9090A8]'
                        }`}
                        title="Save to favorites"
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                      <CopyButton text={`${idea.title}\n\nConcept: ${idea.concept}`} />
                    </div>
                  </div>
                  <p className="text-xs text-[#9090A8] leading-relaxed">
                    {idea.concept}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

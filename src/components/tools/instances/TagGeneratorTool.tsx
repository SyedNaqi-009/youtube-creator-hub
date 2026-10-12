'use client';

import React, { useState } from 'react';
import { generateTags } from '@/lib/tool-logic';
import { CopyButton } from '@/components/ui/CopyButton';
import { Tag, Check, Info, Trash2 } from 'lucide-react';

export function TagGeneratorTool() {
  const [topic, setTopic] = useState('');
  const [secondary, setSecondary] = useState('');
  const [generatedTags, setGeneratedTags] = useState<{ exact: string[]; broad: string[]; longTail: string[] } | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const tags = generateTags(topic, secondary);
    setGeneratedTags(tags);
    // select all by default
    const all = [...tags.exact, ...tags.broad, ...tags.longTail];
    setSelectedTags(all);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const totalChars = selectedTags.join(', ').length;
  const isOverLimit = totalChars > 500;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Primary Video Topic / Keyword *
          </label>
          <input
            type="text"
            placeholder="e.g. Photoshop Tutorial"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Secondary Keyword / Tool (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Beginners, 2026, Pen Tool"
            value={secondary}
            onChange={(e) => setSecondary(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          type="button"
          disabled={!topic.trim()}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center gap-2"
        >
          <Tag className="w-4 h-4" />
          <span>Generate Tag Clusters</span>
        </button>
      </div>

      {/* Honest SEO Note */}
      <div className="p-3.5 rounded-xl bg-[#12121A] border border-[#2A2A3A] flex items-start gap-2.5 text-xs text-[#9090A8]">
        <Info className="w-4 h-4 text-[#7C5CFC] flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-[#F0F0F5]">Note:</strong> YouTube officially states tags have limited impact on video ranking, primarily helping with common misspellings. Prioritize your title, thumbnail, and description.
        </p>
      </div>

      {generatedTags && (
        <div className="pt-6 border-t border-[#242436] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-[#F0F0F5]">
                Selected Tags ({selectedTags.length})
              </h3>
              <p className={`text-xs font-mono mt-0.5 ${isOverLimit ? 'text-[#FF5C5C]' : 'text-[#9090A8]'}`}>
                {totalChars} / 500 characters
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CopyButton text={selectedTags.join(', ')} label="Copy All Selected" />
              <button
                onClick={() => setSelectedTags([])}
                className="text-xs text-[#9090A8] hover:text-[#FF5C5C] px-2 py-1"
              >
                Deselect All
              </button>
            </div>
          </div>

          {/* Tag Cloud Groups */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-[#7C5CFC] uppercase tracking-wider mb-2">
                Exact Matches
              </h4>
              <div className="flex flex-wrap gap-2">
                {generatedTags.exact.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#7C5CFC]/20 border-[#7C5CFC] text-[#F0F0F5]'
                          : 'bg-[#12121A] border-[#2A2A3A] text-[#9090A8] hover:border-[#606078]'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-[#00D4AA]" />}
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#00D4AA] uppercase tracking-wider mb-2">
                Broad Variations
              </h4>
              <div className="flex flex-wrap gap-2">
                {generatedTags.broad.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#00D4AA]/20 border-[#00D4AA] text-[#F0F0F5]'
                          : 'bg-[#12121A] border-[#2A2A3A] text-[#9090A8] hover:border-[#606078]'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-[#00D4AA]" />}
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#FFB547] uppercase tracking-wider mb-2">
                Long-Tail Angles
              </h4>
              <div className="flex flex-wrap gap-2">
                {generatedTags.longTail.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#FFB547]/20 border-[#FFB547] text-[#F0F0F5]'
                          : 'bg-[#12121A] border-[#2A2A3A] text-[#9090A8] hover:border-[#606078]'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-[#00D4AA]" />}
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

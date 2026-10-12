'use client';

import React, { useState } from 'react';
import { generateScriptOutline } from '@/lib/tool-logic';
import { CopyButton } from '@/components/ui/CopyButton';
import { FileEdit, Download, Sparkles } from 'lucide-react';

export function ScriptOutlineGeneratorTool() {
  const [topic, setTopic] = useState('');
  const [targetLength, setTargetLength] = useState('Medium (5-15 min)');
  const [keyPoints, setKeyPoints] = useState('');
  const [outline, setOutline] = useState('');

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const res = generateScriptOutline(topic, targetLength, keyPoints);
    setOutline(res);
  };

  const downloadTxt = () => {
    if (!outline) return;
    const blob = new Blob([outline], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `script-outline-${topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Video Title or Topic *
          </label>
          <input
            type="text"
            placeholder="e.g. How to Build Muscle at Home Without Weights"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Target Video Runtime
          </label>
          <select
            value={targetLength}
            onChange={(e) => setTargetLength(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          >
            <option value="Short (<5 min)">Short Form (&lt;5 min)</option>
            <option value="Medium (5-15 min)">Medium Length (5-15 min)</option>
            <option value="Long (15-30 min)">Long Form (15-30 min)</option>
            <option value="Extended (30+ min)">Extended Deep Dive (30+ min)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
          Key Talking Points (Optional - One per line)
        </label>
        <textarea
          rows={3}
          placeholder="Progressive overload principles&#10;Nutrition fundamentals&#10;Sample weekly routine"
          value={keyPoints}
          onChange={(e) => setKeyPoints(e.target.value)}
          className="w-full p-3 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] placeholder-[#606078] focus:outline-none focus:border-[#7C5CFC]"
        />
      </div>

      <button
        onClick={handleGenerate}
        type="button"
        disabled={!topic.trim()}
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center gap-2"
      >
        <FileEdit className="w-4 h-4" />
        <span>Generate Structured Script Outline</span>
      </button>

      {outline && (
        <div className="pt-6 border-t border-[#242436] space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-[#F0F0F5]">
              Pre-Production Outline
            </h4>
            <div className="flex items-center gap-2">
              <button
                onClick={downloadTxt}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A3A] hover:border-[#00D4AA] text-xs font-medium text-[#F0F0F5] hover:text-[#00D4AA] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save .txt</span>
              </button>
              <CopyButton text={outline} label="Copy Outline" />
            </div>
          </div>

          <pre className="p-5 rounded-xl bg-[#12121A] border border-[#242436] text-xs font-mono text-[#F0F0F5] whitespace-pre-wrap leading-relaxed">
            {outline}
          </pre>
        </div>
      )}
    </div>
  );
}

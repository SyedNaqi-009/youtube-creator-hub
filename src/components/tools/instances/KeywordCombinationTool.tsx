'use client';

import React, { useState } from 'react';
import { combineKeywordLists } from '@/lib/tool-logic';
import { CopyButton } from '@/components/ui/CopyButton';
import { Layers, Download, Trash2 } from 'lucide-react';

export function KeywordCombinationTool() {
  const [listA, setListA] = useState('YouTube\nVideo editing\nContent creation');
  const [listB, setListB] = useState('tutorial\ntips\nmasterclass\nworkflow');
  const [listC, setListC] = useState('for beginners\nin 2026\nstep by step');
  const [results, setResults] = useState<string[]>([]);

  const handleCombine = () => {
    const arrA = listA.split('\n');
    const arrB = listB.split('\n');
    const arrC = listC.split('\n');
    const combos = combineKeywordLists([arrA, arrB, arrC]);
    setResults(combos);
  };

  const downloadCSV = () => {
    if (results.length === 0) return;
    const content = 'data:text/csv;charset=utf-8,Keyword Combination\n' + results.map(r => `"${r}"`).join('\n');
    const encoded = encodeURI(content);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', 'youtube-keyword-combinations.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#7C5CFC] mb-1.5">
            List A (Core Topics)
          </label>
          <textarea
            rows={5}
            value={listA}
            onChange={(e) => setListA(e.target.value)}
            className="w-full p-3 text-xs font-mono bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#00D4AA] mb-1.5">
            List B (Modifiers / Formats)
          </label>
          <textarea
            rows={5}
            value={listB}
            onChange={(e) => setListB(e.target.value)}
            className="w-full p-3 text-xs font-mono bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFB547] mb-1.5">
            List C (Audience / Timeframe)
          </label>
          <textarea
            rows={5}
            value={listC}
            onChange={(e) => setListC(e.target.value)}
            className="w-full p-3 text-xs font-mono bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleCombine}
          type="button"
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-xs font-semibold hover:opacity-90 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center gap-2"
        >
          <Layers className="w-4 h-4" />
          <span>Combine Keyword Lists</span>
        </button>
      </div>

      {results.length > 0 && (
        <div className="pt-6 border-t border-[#242436] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-[#F0F0F5]">
                Combined Permutations ({results.length})
              </h3>
              <p className="text-xs text-[#9090A8]">Duplicate entries removed automatically</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={downloadCSV}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#2A2A3A] hover:border-[#00D4AA] bg-[#161620] text-xs font-medium text-[#F0F0F5] hover:text-[#00D4AA] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
              <CopyButton text={results.join('\n')} label="Copy All Lines" />
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto p-4 rounded-xl bg-[#12121A] border border-[#242436] space-y-1.5 font-mono text-xs text-[#F0F0F5]">
            {results.map((r, i) => (
              <div key={i} className="py-1 px-2 rounded hover:bg-[#161620] flex items-center justify-between">
                <span>{r}</span>
                <CopyButton text={r} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

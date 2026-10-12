'use client';

import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

interface ChapterRow {
  timestamp: string;
  title: string;
}

export function ChapterGeneratorTool() {
  const [rows, setRows] = useState<ChapterRow[]>([
    { timestamp: '0:00', title: 'Introduction & Overview' },
    { timestamp: '1:45', title: 'Core Strategy Explained' },
    { timestamp: '4:20', title: 'Live Walkthrough Demo' },
    { timestamp: '8:15', title: 'Pro Tips & Mistakes to Avoid' },
    { timestamp: '11:00', title: 'Final Summary & Next Steps' },
  ]);

  const [bulkInput, setBulkInput] = useState('');
  const [showBulk, setShowBulk] = useState(false);

  const addRow = () => {
    setRows([...rows, { timestamp: '', title: '' }]);
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: keyof ChapterRow, val: string) => {
    const updated = [...rows];
    updated[index][field] = val;
    setRows(updated);
  };

  const handleBulkParse = () => {
    const lines = bulkInput.split('\n').filter(l => l.trim());
    const parsed: ChapterRow[] = [];

    for (const line of lines) {
      const match = line.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s+(.+)$/);
      if (match) {
        parsed.push({ timestamp: match[1], title: match[2].trim() });
      }
    }

    if (parsed.length > 0) {
      setRows(parsed);
      setShowBulk(false);
      setBulkInput('');
    }
  };

  // YouTube validation checks
  const startsWithZero = rows.length > 0 && (rows[0].timestamp === '0:00' || rows[0].timestamp === '00:00');
  const hasThreeChapters = rows.length >= 3;

  const formattedOutput = rows
    .filter(r => r.timestamp && r.title)
    .map(r => `${r.timestamp} ${r.title}`)
    .join('\n');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9090A8]">
          Chapter Timestamps
        </h3>
        <button
          onClick={() => setShowBulk(!showBulk)}
          className="text-xs text-[#7C5CFC] hover:underline"
        >
          {showBulk ? 'Switch to Row Editor' : 'Paste Bulk Text'}
        </button>
      </div>

      {showBulk ? (
        <div className="space-y-3">
          <textarea
            rows={6}
            placeholder="0:00 Intro&#10;1:30 Tools Needed&#10;4:15 Step 1"
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            className="w-full p-4 text-xs font-mono bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
          <button
            onClick={handleBulkParse}
            className="px-4 py-2 rounded-lg bg-[#7C5CFC] text-white text-xs font-semibold"
          >
            Parse Chapters
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {rows.map((row, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="0:00"
                value={row.timestamp}
                onChange={(e) => updateRow(idx, 'timestamp', e.target.value)}
                className="w-24 px-3 py-2 text-xs font-mono bg-[#12121A] border border-[#2A2A3A] rounded-lg text-[#F0F0F5] text-center focus:outline-none focus:border-[#7C5CFC]"
              />
              <input
                type="text"
                placeholder="Chapter title"
                value={row.title}
                onChange={(e) => updateRow(idx, 'title', e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-lg text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
              />
              <button
                onClick={() => removeRow(idx)}
                className="p-2 text-[#9090A8] hover:text-[#FF5C5C] transition-colors"
                title="Delete row"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            onClick={addRow}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A3A] text-xs text-[#9090A8] hover:text-[#F0F0F5] hover:border-[#7C5CFC] mt-2 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Chapter Row</span>
          </button>
        </div>
      )}

      {/* Validation Banner */}
      <div className="p-3.5 rounded-xl bg-[#12121A] border border-[#242436] space-y-1.5 text-xs">
        <div className="flex items-center gap-2">
          {startsWithZero ? (
            <CheckCircle2 className="w-4 h-4 text-[#00D4AA]" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-[#FF5C5C]" />
          )}
          <span className={startsWithZero ? 'text-[#00D4AA]' : 'text-[#FF5C5C]'}>
            First timestamp must be exactly 0:00
          </span>
        </div>

        <div className="flex items-center gap-2">
          {hasThreeChapters ? (
            <CheckCircle2 className="w-4 h-4 text-[#00D4AA]" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-[#FF5C5C]" />
          )}
          <span className={hasThreeChapters ? 'text-[#00D4AA]' : 'text-[#FF5C5C]'}>
            Minimum of 3 chapters required for YouTube player scrubber to activate
          </span>
        </div>
      </div>

      {formattedOutput && (
        <div className="pt-4 border-t border-[#242436] space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-[#F0F0F5]">
              YouTube Description Ready Output
            </h4>
            <CopyButton text={formattedOutput} label="Copy Chapters" />
          </div>

          <pre className="p-4 rounded-xl bg-[#12121A] border border-[#242436] text-xs font-mono text-[#F0F0F5] whitespace-pre-wrap leading-relaxed">
            {formattedOutput}
          </pre>
        </div>
      )}
    </div>
  );
}

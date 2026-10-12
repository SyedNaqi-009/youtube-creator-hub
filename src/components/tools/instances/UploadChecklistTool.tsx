'use client';

import React, { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle2, RotateCcw } from 'lucide-react';

interface UploadItem {
  id: string;
  stage: string;
  task: string;
}

const UPLOAD_ITEMS: UploadItem[] = [
  // Stage 1: Export
  { id: 'u1', stage: 'Video File & Audio Quality', task: 'Rendered in 1080p, 1440p, or 4K resolution at native framerate (24fps, 30fps, or 60fps)' },
  { id: 'u2', stage: 'Video File & Audio Quality', task: 'Audio peaks leveled between -1dB to -2dB (no clipping or quiet distortion)' },
  { id: 'u3', stage: 'Video File & Audio Quality', task: 'File exported in recommended MP4 (H.264/AAC) format' },

  // Stage 2: Metadata
  { id: 'u4', stage: 'Metadata & Indexing', task: 'Video uploaded as "Unlisted" initially to allow 4K processing and copyright checks' },
  { id: 'u5', stage: 'Metadata & Indexing', task: 'Click-worthy title verified under 60-70 characters' },
  { id: 'u6', stage: 'Metadata & Indexing', task: 'Description written with above-the-fold value summary and timestamps' },
  { id: 'u7', stage: 'Metadata & Indexing', task: 'Category accurately selected in YouTube Studio settings' },

  // Stage 3: Packaging
  { id: 'u8', stage: 'Packaging & Polish', task: 'Custom 1280×720 thumbnail uploaded (checked for contrast and safe zones)' },
  { id: 'u9', stage: 'Packaging & Polish', task: 'End screen elements positioned in the final 20 seconds of video' },
  { id: 'u10', stage: 'Packaging & Polish', task: 'Interactive cards placed at points with natural drop-off risks' },
  { id: 'u11', stage: 'Packaging & Polish', task: 'Closed captions / subtitles verified or uploaded' },

  // Stage 4: Post-Launch
  { id: 'u12', stage: 'Launch & Community', task: 'Engaging discussion question pinned in top comment slot' },
  { id: 'u13', stage: 'Launch & Community', task: 'Community tab post scheduled to notify dedicated subscribers' },
  { id: 'u14', stage: 'Launch & Community', task: 'Creator available to heart and reply to incoming comments for the first 2 hours' },
];

export function UploadChecklistTool() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('yt_upload_checklist');
      if (saved) setCompleted(JSON.parse(saved));
    } catch {}
  }, []);

  const toggle = (id: string) => {
    const next = completed.includes(id)
      ? completed.filter(x => x !== id)
      : [...completed, id];
    setCompleted(next);
    try {
      localStorage.setItem('yt_upload_checklist', JSON.stringify(next));
    } catch {}
  };

  const resetAll = () => {
    setCompleted([]);
    try {
      localStorage.removeItem('yt_upload_checklist');
    } catch {}
  };

  const score = Math.round((completed.length / UPLOAD_ITEMS.length) * 100);
  const stages = Array.from(new Set(UPLOAD_ITEMS.map(i => i.stage)));

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="p-5 rounded-xl bg-[#12121A] border border-[#242436] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto flex-1">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-[#F0F0F5]">Pre-Upload Readiness</span>
            <span className="font-bold text-[#00D4AA]">{score}% Complete</span>
          </div>
          <div className="w-full h-3 rounded-full bg-[#161620] overflow-hidden border border-[#242436]">
            <div
              className="h-full bg-gradient-to-r from-[#7C5CFC] to-[#00D4AA] transition-all duration-300"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        <button
          onClick={resetAll}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A3A] hover:border-[#FF5C5C] text-xs text-[#9090A8] hover:text-[#FF5C5C] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Checklist</span>
        </button>
      </div>

      <div className="space-y-6">
        {stages.map((stage) => (
          <div key={stage} className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7C5CFC]">
              {stage}
            </h3>
            <div className="space-y-2">
              {UPLOAD_ITEMS.filter(i => i.stage === stage).map((item) => {
                const isDone = completed.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isDone
                        ? 'bg-[#12121A] border-[#00D4AA]/40 text-[#F0F0F5]'
                        : 'bg-[#161620] border-[#242436] text-[#9090A8] hover:border-[#3E3E52]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isDone ? 'bg-[#00D4AA] border-[#00D4AA]' : 'border-[#2A2A3A] bg-[#12121A]'
                    }`}>
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-[#0F0F12]" />}
                    </div>
                    <span className={`text-xs sm:text-sm ${isDone ? 'line-through text-[#606078]' : ''}`}>
                      {item.task}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

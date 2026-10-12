'use client';

import React, { useState } from 'react';
import { UserCheck, Sparkles, Copy } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

export function BioGeneratorTool() {
  const [channelName, setChannelName] = useState('');
  const [niche, setNiche] = useState('');
  const [audience, setAudience] = useState('');
  const [schedule, setSchedule] = useState('New videos every Tuesday and Friday');
  const [tone, setTone] = useState('Inspirational');
  const [bio, setBio] = useState('');

  const handleGenerate = () => {
    const name = channelName.trim() || 'Our Channel';
    const n = niche.trim() || 'practical knowledge and skills';
    const aud = audience.trim() || 'ambitious creators';

    const text = `Welcome to ${name}! 🎬

We help ${aud} master ${n} through step-by-step breakdowns, practical guides, and no-fluff tutorials.

📅 UPLOAD SCHEDULE:
${schedule}

🔔 Subscribe and turn on notifications to never miss a release.
For business inquiries, partnerships, or collabs: contact@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com

Join our community as we build and grow together!`;

    setBio(text);
  };

  const charCount = bio.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Channel Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Creator Academy"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Core Niche / Topic *
          </label>
          <input
            type="text"
            placeholder="e.g. Modern Web Development"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Target Audience
          </label>
          <input
            type="text"
            placeholder="e.g. Developers, Beginners, Filmmakers"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Upload Schedule
          </label>
          <input
            type="text"
            placeholder="e.g. Every Monday & Thursday"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        type="button"
        disabled={!channelName.trim()}
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center gap-2"
      >
        <UserCheck className="w-4 h-4" />
        <span>Generate Channel About Bio</span>
      </button>

      {bio && (
        <div className="pt-6 border-t border-[#242436] space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-[#F0F0F5]">
              Channel About Bio Preview
            </h4>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-mono ${charCount > 1000 ? 'text-[#FF5C5C]' : 'text-[#9090A8]'}`}>
                {charCount} / 1,000 characters
              </span>
              <CopyButton text={bio} label="Copy Bio" />
            </div>
          </div>

          <textarea
            rows={8}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-4 text-xs font-mono bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC] leading-relaxed"
          />
        </div>
      )}
    </div>
  );
}

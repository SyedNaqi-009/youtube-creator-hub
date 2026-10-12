'use client';

import React, { useState } from 'react';
import { MessageCircle, Pin, Sparkles } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

export function PinnedCommentGeneratorTool() {
  const [topic, setTopic] = useState('');
  const [objective, setObjective] = useState('Question');
  const [resourceLink, setResourceLink] = useState('https://creatorhub.tools');
  const [comments, setComments] = useState<string[]>([]);

  const handleGenerate = () => {
    const t = topic.trim() || 'this video';
    const link = resourceLink.trim() || 'https://creatorhub.tools';

    const generated: string[] = [
      `👇 QUESTION OF THE DAY:\nWhat is the #1 obstacle holding you back with ${t} right now? Drop your honest thought below and I'll reply to the first 50 comments! 💬❤️`,
      `🚨 QUICK POLL:\nAre you currently doing ${t} the traditional way (Option A) or experimenting with the new strategy (Option B)? Let me know below! 👇`,
      `📌 RESOURCES MENTIONED IN THIS VIDEO:\nGrab the companion template, checklists, and guides here: ${link}\n\nDid you find this breakdown helpful? Let me know! 🚀`,
      `❤️ THANK YOU FOR WATCHING!\nIf you enjoyed this breakdown on ${t}, please smash the like button and let me know what topic you want me to cover next week! 🔔`,
      `⏱️ WATCHING TIP:\nIf you're short on time, make sure not to miss the section at 4:30—that's the key breakthrough for ${t}. What was your biggest takeaway? 👇`
    ];

    setComments(generated);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Video Subject / Theme *
          </label>
          <input
            type="text"
            placeholder="e.g. Video Editing, Home Studio Setup"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Resource / Link (Optional)
          </label>
          <input
            type="text"
            placeholder="https://yourlink.com"
            value={resourceLink}
            onChange={(e) => setResourceLink(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        type="button"
        disabled={!topic.trim()}
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center gap-2"
      >
        <Pin className="w-4 h-4 text-[#FFB547]" />
        <span>Generate Pinned Comments</span>
      </button>

      {comments.length > 0 && (
        <div className="pt-6 border-t border-[#242436] space-y-4">
          <h3 className="text-sm font-semibold text-[#F0F0F5]">
            High-Engagement Pinned Comment Variations ({comments.length})
          </h3>

          <div className="space-y-3">
            {comments.map((cmt, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#12121A] border border-[#242436] space-y-3">
                <p className="text-xs font-mono text-[#F0F0F5] whitespace-pre-wrap leading-relaxed">
                  {cmt}
                </p>
                <div className="flex justify-end pt-2 border-t border-[#242436]/60">
                  <CopyButton text={cmt} label="Copy Comment" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

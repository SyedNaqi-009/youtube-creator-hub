'use client';

import React, { useState } from 'react';
import { formatNumber } from '@/lib/utils';
import { Users, Sparkles, ArrowRightLeft, ShieldCheck } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

export function CollaborationValueCalculatorTool() {
  const [mySubs, setMySubs] = useState(25000);
  const [myViews, setMyViews] = useState(12000);
  const [partnerSubs, setPartnerSubs] = useState(40000);
  const [partnerViews, setPartnerViews] = useState(18000);
  const [collabType, setCollabType] = useState('Collab video (2-part series)');

  const combinedSubs = mySubs + partnerSubs;
  const estimatedOverlap = Math.round(Math.min(mySubs, partnerSubs) * 0.15); // 15% estimated overlap
  const netReach = combinedSubs - estimatedOverlap;

  const sizeRatio = Number((Math.max(mySubs, partnerSubs) / Math.max(1, Math.min(mySubs, partnerSubs))).toFixed(1));

  let parityRecommendation = 'Even Channel Parity: Excellent match for a standard reciprocal 2-part collaboration.';
  if (sizeRatio > 3) {
    parityRecommendation = 'Asymmetric Channel Size: The smaller channel should offer editing, script assistance, or guest hosting to provide fair value.';
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Channel */}
        <div className="p-4 rounded-xl bg-[#12121A] border border-[#7C5CFC]/30 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C5CFC] block">
            Your Channel Metrics
          </span>
          <div>
            <label className="block text-[11px] text-[#9090A8] mb-1">Subscriber Count</label>
            <input
              type="number"
              min={0}
              value={mySubs}
              onChange={(e) => setMySubs(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs bg-[#161620] border border-[#2A2A3A] rounded-lg text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
            />
          </div>
          <div>
            <label className="block text-[11px] text-[#9090A8] mb-1">Average Views / Video</label>
            <input
              type="number"
              min={0}
              value={myViews}
              onChange={(e) => setMyViews(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs bg-[#161620] border border-[#2A2A3A] rounded-lg text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
            />
          </div>
        </div>

        {/* Partner Channel */}
        <div className="p-4 rounded-xl bg-[#12121A] border border-[#00D4AA]/30 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00D4AA] block">
            Partner Channel Metrics
          </span>
          <div>
            <label className="block text-[11px] text-[#9090A8] mb-1">Subscriber Count</label>
            <input
              type="number"
              min={0}
              value={partnerSubs}
              onChange={(e) => setPartnerSubs(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs bg-[#161620] border border-[#2A2A3A] rounded-lg text-[#F0F0F5] focus:outline-none focus:border-[#00D4AA]"
            />
          </div>
          <div>
            <label className="block text-[11px] text-[#9090A8] mb-1">Average Views / Video</label>
            <input
              type="number"
              min={0}
              value={partnerViews}
              onChange={(e) => setPartnerViews(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs bg-[#161620] border border-[#2A2A3A] rounded-lg text-[#F0F0F5] focus:outline-none focus:border-[#00D4AA]"
            />
          </div>
        </div>
      </div>

      {/* Exposure Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436] text-center">
          <span className="text-xs text-[#9090A8] block">Combined Gross Audience</span>
          <span className="text-xl font-bold text-[#F0F0F5] font-mono mt-1 block">
            {formatNumber(combinedSubs)} subs
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436] text-center">
          <span className="text-xs text-[#9090A8] block">Estimated Net Unique Reach</span>
          <span className="text-xl font-bold text-[#00D4AA] font-mono mt-1 block">
            {formatNumber(netReach)} subs
          </span>
          <span className="text-[10px] text-[#606078] block">≈ 15% overlap deducted</span>
        </div>

        <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436] text-center">
          <span className="text-xs text-[#9090A8] block">Channel Size Ratio</span>
          <span className="text-xl font-bold text-[#FFB547] font-mono mt-1 block">
            {sizeRatio}:1
          </span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#161620] border border-[#242436] text-xs text-[#9090A8] space-y-1">
        <p className="font-semibold text-[#F0F0F5]">Collaboration Strategic Recommendation:</p>
        <p>{parityRecommendation}</p>
      </div>
    </div>
  );
}

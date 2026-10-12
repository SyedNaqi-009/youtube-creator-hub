'use client';

import React, { useState } from 'react';
import { formatNumber } from '@/lib/utils';
import { Target, CheckCircle2, Clock, Users, Flame } from 'lucide-react';

export function MonetizationCalculatorTool() {
  const [subscribers, setSubscribers] = useState(450);
  const [watchHours, setWatchHours] = useState(1800);
  const [monthlyViews, setMonthlyViews] = useState(25000);
  const [shortsViews, setShortsViews] = useState(1500000);

  const subTarget = 1000;
  const watchTarget = 4000;
  const shortsTarget = 10000000;

  const subPercent = Math.min(100, Math.round((subscribers / subTarget) * 100));
  const watchPercent = Math.min(100, Math.round((watchHours / watchTarget) * 100));
  const shortsPercent = Math.min(100, Math.round((shortsViews / shortsTarget) * 100));

  const isEligibleLong = subscribers >= subTarget && watchHours >= watchTarget;
  const isEligibleShorts = subscribers >= subTarget && shortsViews >= shortsTarget;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Current Subscriber Count
          </label>
          <input
            type="number"
            min={0}
            value={subscribers}
            onChange={(e) => setSubscribers(Number(e.target.value) || 0)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Valid Public Watch Hours (Past 12 Months)
          </label>
          <input
            type="number"
            min={0}
            value={watchHours}
            onChange={(e) => setWatchHours(Number(e.target.value) || 0)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Shorts Views (Past 90 Days - Alternative Path)
          </label>
          <input
            type="number"
            min={0}
            value={shortsViews}
            onChange={(e) => setShortsViews(Number(e.target.value) || 0)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Monthly Average Views
          </label>
          <input
            type="number"
            min={0}
            value={monthlyViews}
            onChange={(e) => setMonthlyViews(Number(e.target.value) || 0)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>
      </div>

      {/* Progress Cards */}
      <div className="space-y-4 pt-4 border-t border-[#242436]">
        {/* Subscriber Progress */}
        <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#F0F0F5] flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#7C5CFC]" />
              <span>Subscribers Requirement</span>
            </span>
            <span className="font-mono text-[#7C5CFC] font-bold">
              {formatNumber(subscribers)} / 1,000 ({subPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-[#161620] overflow-hidden">
            <div className="h-full bg-[#7C5CFC] transition-all" style={{ width: `${subPercent}%` }} />
          </div>
        </div>

        {/* Watch Hours Progress */}
        <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#F0F0F5] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#00D4AA]" />
              <span>Watch Hours (Option A: Long-Form)</span>
            </span>
            <span className="font-mono text-[#00D4AA] font-bold">
              {formatNumber(watchHours)} / 4,000 hrs ({watchPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-[#161620] overflow-hidden">
            <div className="h-full bg-[#00D4AA] transition-all" style={{ width: `${watchPercent}%` }} />
          </div>
        </div>

        {/* Shorts Views Progress */}
        <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#F0F0F5] flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#FFB547]" />
              <span>Shorts Views in 90 Days (Option B: Shorts Path)</span>
            </span>
            <span className="font-mono text-[#FFB547] font-bold">
              {formatNumber(shortsViews)} / 10,000,000 ({shortsPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-[#161620] overflow-hidden">
            <div className="h-full bg-[#FFB547] transition-all" style={{ width: `${shortsPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Eligibility Status Banner */}
      <div className={`p-4 rounded-xl border flex items-center gap-3 ${
        isEligibleLong || isEligibleShorts
          ? 'bg-[#00D4AA]/10 border-[#00D4AA]/40 text-[#00D4AA]'
          : 'bg-[#12121A] border-[#2A2A3A] text-[#9090A8]'
      }`}>
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        <div className="text-xs">
          {isEligibleLong || isEligibleShorts ? (
            <p className="font-bold text-[#F0F0F5]">
              Congratulations! Your channel metrics meet the criteria to apply for the YouTube Partner Program (YPP).
            </p>
          ) : (
            <p>
              Keep growing! You need 1,000 subscribers AND either 4,000 watch hours or 10M Shorts views to unlock AdSense revenue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

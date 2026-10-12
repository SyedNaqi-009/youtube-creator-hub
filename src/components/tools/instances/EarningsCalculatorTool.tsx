'use client';

import React, { useState } from 'react';
import { calculateEarnings } from '@/lib/tool-logic';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { DollarSign, HelpCircle, BarChart3, Info } from 'lucide-react';

const NICHE_PRESETS = [
  { name: 'Finance & Investing', rpm: 18.0, desc: '$10 - $30 RPM' },
  { name: 'Technology & SaaS', rpm: 9.0, desc: '$5 - $12 RPM' },
  { name: 'Health & Fitness', rpm: 8.5, desc: '$6 - $15 RPM' },
  { name: 'Education & Tutorials', rpm: 6.5, desc: '$4 - $10 RPM' },
  { name: 'Food & Cooking', rpm: 5.0, desc: '$3 - $8 RPM' },
  { name: 'Gaming', rpm: 3.5, desc: '$2 - $5 RPM' },
  { name: 'Entertainment & Comedy', rpm: 3.0, desc: '$2 - $6 RPM' },
];

export function EarningsCalculatorTool() {
  const [dailyViews, setDailyViews] = useState(10000);
  const [rpm, setRpm] = useState(6.5);
  const [monetizedPercent, setMonetizedPercent] = useState(60);

  const earnings = calculateEarnings(dailyViews, rpm, monetizedPercent);

  return (
    <div className="space-y-6">
      {/* Niche Presets */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-2">
          Load Industry Niche Benchmark
        </label>
        <div className="flex flex-wrap gap-2">
          {NICHE_PRESETS.map((n) => (
            <button
              key={n.name}
              type="button"
              onClick={() => setRpm(n.rpm)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                rpm === n.rpm
                  ? 'bg-[#7C5CFC] border-[#7C5CFC] text-white'
                  : 'bg-[#12121A] border-[#2A2A3A] text-[#9090A8] hover:text-[#F0F0F5]'
              }`}
            >
              <span>{n.name}</span>
              <span className="text-[10px] ml-1 opacity-70">({n.desc})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sliders & Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Daily Views */}
        <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#F0F0F5]">Daily Views</span>
            <span className="font-mono text-[#00D4AA] font-bold">{formatNumber(dailyViews)}</span>
          </div>
          <input
            type="range"
            min={1000}
            max={500000}
            step={1000}
            value={dailyViews}
            onChange={(e) => setDailyViews(Number(e.target.value))}
            className="w-full accent-[#7C5CFC]"
          />
          <div className="flex justify-between text-[10px] text-[#606078]">
            <span>1K</span>
            <span>100K</span>
            <span>500K</span>
          </div>
        </div>

        {/* RPM */}
        <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#F0F0F5]">Estimated RPM ($)</span>
            <span className="font-mono text-[#7C5CFC] font-bold">${rpm.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={1.0}
            max={35.0}
            step={0.5}
            value={rpm}
            onChange={(e) => setRpm(Number(e.target.value))}
            className="w-full accent-[#7C5CFC]"
          />
          <div className="flex justify-between text-[10px] text-[#606078]">
            <span>$1.0</span>
            <span>$18.0</span>
            <span>$35.0</span>
          </div>
        </div>

        {/* Monetized % */}
        <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#F0F0F5]">Monetized Views (%)</span>
            <span className="font-mono text-[#FFB547] font-bold">{monetizedPercent}%</span>
          </div>
          <input
            type="range"
            min={20}
            max={90}
            step={5}
            value={monetizedPercent}
            onChange={(e) => setMonetizedPercent(Number(e.target.value))}
            className="w-full accent-[#7C5CFC]"
          />
          <div className="flex justify-between text-[10px] text-[#606078]">
            <span>20% (low ad rate)</span>
            <span>60% (avg)</span>
            <span>90%</span>
          </div>
        </div>
      </div>

      {/* Projections Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#242436]">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#161620] to-[#12121A] border border-[#242436] text-center">
          <span className="text-xs uppercase font-semibold text-[#9090A8] block mb-1">Daily Estimated</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#00D4AA] font-mono">
            {formatCurrency(earnings.daily)}
          </span>
          <span className="text-[11px] text-[#606078] block mt-1">
            Based on {formatNumber(dailyViews)} views
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#161620] to-[#12121A] border border-[#7C5CFC]/40 text-center shadow-lg shadow-[#7C5CFC]/10">
          <span className="text-xs uppercase font-semibold text-[#7C5CFC] block mb-1">Monthly Estimated</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#F0F0F5] font-mono">
            {formatCurrency(earnings.monthly)}
          </span>
          <span className="text-[11px] text-[#9090A8] block mt-1">
            ≈ {formatNumber(dailyViews * 30)} monthly views
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#161620] to-[#12121A] border border-[#242436] text-center">
          <span className="text-xs uppercase font-semibold text-[#9090A8] block mb-1">Yearly Estimated</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#FFB547] font-mono">
            {formatCurrency(earnings.yearly)}
          </span>
          <span className="text-[11px] text-[#606078] block mt-1">
            Annual projected gross earnings
          </span>
        </div>
      </div>

      {/* Prominent Educational Disclaimer */}
      <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436] flex items-start gap-3 text-xs text-[#9090A8]">
        <Info className="w-5 h-5 text-[#FFB547] flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-[#F0F0F5]">Educational Calculation Disclaimer</p>
          <p>
            These figures are rough mathematical estimates for educational modeling only. Real-world YouTube AdSense earnings vary dramatically based on viewer geography (tier 1 vs tier 3 countries), seasonal advertiser ad spend, viewer AdBlock adoption, watch time retention, and platform policy updates. YouTube does not guarantee any specific RPM or income.
          </p>
        </div>
      </div>
    </div>
  );
}

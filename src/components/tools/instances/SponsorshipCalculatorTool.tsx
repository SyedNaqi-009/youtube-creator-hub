'use client';

import React, { useState } from 'react';
import { calculateSponsorshipRate } from '@/lib/tool-logic';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { DollarSign, Briefcase, Info, CheckCircle2 } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

export function SponsorshipCalculatorTool() {
  const [avgViews, setAvgViews] = useState(35000);
  const [niche, setNiche] = useState('Tech');
  const [sponsorType, setSponsorType] = useState('60s integrated mention');

  const rates = calculateSponsorshipRate(avgViews, niche, sponsorType);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Average Views / Video (Last 10) *
          </label>
          <input
            type="number"
            min={100}
            value={avgViews}
            onChange={(e) => setAvgViews(Number(e.target.value) || 0)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Channel Niche
          </label>
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          >
            <option value="Finance">Finance & Investing (High CPV)</option>
            <option value="Business">Business & SaaS (High CPV)</option>
            <option value="Tech">Tech, Gadgets & Hardware</option>
            <option value="Fitness">Fitness, Health & Nutrition</option>
            <option value="Gaming">Gaming & Streaming</option>
            <option value="Vlog">Lifestyle, Vlog & Comedy</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Deliverable Format
          </label>
          <select
            value={sponsorType}
            onChange={(e) => setSponsorType(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          >
            <option value="60s integrated mention">60s Mid-Roll Integration (Standard)</option>
            <option value="Dedicated video">Full Dedicated Video (2.5x Multiplier)</option>
            <option value="Shorts sponsorship">YouTube Shorts Sponsorship</option>
            <option value="Pre-roll">30s Pre-Roll Mention</option>
          </select>
        </div>
      </div>

      {/* Pricing Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-5 rounded-2xl bg-[#12121A] border border-[#242436] text-center">
          <span className="text-xs uppercase font-semibold text-[#9090A8] block mb-1">
            Conservative Floor (Low)
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#F0F0F5] font-mono">
            {formatCurrency(rates.low)}
          </span>
          <span className="text-[11px] text-[#606078] block mt-1">
            For unproven brands or first-time sponsors
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#161620] to-[#12121A] border border-[#7C5CFC]/40 text-center shadow-lg shadow-[#7C5CFC]/10">
          <span className="text-xs uppercase font-semibold text-[#7C5CFC] block mb-1">
            Target Asking Rate (Recommended)
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#00D4AA] font-mono">
            {formatCurrency(rates.mid)}
          </span>
          <span className="text-[11px] text-[#9090A8] block mt-1">
            Fair market compensation
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#12121A] border border-[#242436] text-center">
          <span className="text-xs uppercase font-semibold text-[#FFB547] block mb-1">
            Premium Ceiling (High)
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#FFB547] font-mono">
            {formatCurrency(rates.high)}
          </span>
          <span className="text-[11px] text-[#606078] block mt-1">
            Includes exclusivity or ad whitelisting rights
          </span>
        </div>
      </div>

      <div className="flex justify-end">
        <CopyButton
          text={`Estimated Sponsorship Quote: ${formatCurrency(rates.mid)} (Range: ${formatCurrency(rates.low)} - ${formatCurrency(rates.high)}) for ${sponsorType}`}
          label="Copy Rate Quote"
        />
      </div>

      {/* Negotiation Factors Disclaimer */}
      <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436] flex items-start gap-3 text-xs text-[#9090A8]">
        <Info className="w-5 h-5 text-[#7C5CFC] flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-[#F0F0F5]">Negotiation Disclaimer:</strong> These figures are benchmark starting points based on median creator CPV rates. Your actual rate depends on brand alignment, click-through track record, demographic location of your viewers, and whether usage rights or social cutdowns are included.
        </p>
      </div>
    </div>
  );
}

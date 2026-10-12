'use client';

import React, { useState } from 'react';
import { calculateCpmRpm } from '@/lib/tool-logic';
import { DollarSign, HelpCircle, ArrowRightLeft } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

export function CpmRpmCalculatorTool() {
  const [mode, setMode] = useState<'rpm' | 'earnings' | 'cpm'>('rpm');
  const [inputA, setInputA] = useState(150); // earnings or rpm or cost
  const [inputB, setInputB] = useState(25000); // monetized views or total views or impressions

  const calculation = calculateCpmRpm(mode, inputA, inputB);

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setMode('rpm'); setInputA(150); setInputB(25000); }}
          className={`flex-1 min-w-[140px] py-2 text-xs font-semibold rounded-xl border transition-colors ${
            mode === 'rpm' ? 'bg-[#7C5CFC] border-[#7C5CFC] text-white' : 'bg-[#12121A] border-[#2A2A3A] text-[#9090A8]'
          }`}
        >
          Calculate RPM (From Revenue)
        </button>
        <button
          onClick={() => { setMode('earnings'); setInputA(6.5); setInputB(50000); }}
          className={`flex-1 min-w-[140px] py-2 text-xs font-semibold rounded-xl border transition-colors ${
            mode === 'earnings' ? 'bg-[#7C5CFC] border-[#7C5CFC] text-white' : 'bg-[#12121A] border-[#2A2A3A] text-[#9090A8]'
          }`}
        >
          Calculate Earnings (From RPM)
        </button>
        <button
          onClick={() => { setMode('cpm'); setInputA(400); setInputB(30000); }}
          className={`flex-1 min-w-[140px] py-2 text-xs font-semibold rounded-xl border transition-colors ${
            mode === 'cpm' ? 'bg-[#7C5CFC] border-[#7C5CFC] text-white' : 'bg-[#12121A] border-[#2A2A3A] text-[#9090A8]'
          }`}
        >
          Calculate Advertiser CPM
        </button>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            {mode === 'rpm' ? 'Net Revenue Received ($)' : mode === 'earnings' ? 'Known RPM ($)' : 'Total Advertiser Spend ($)'}
          </label>
          <input
            type="number"
            min={0}
            step="any"
            value={inputA}
            onChange={(e) => setInputA(Number(e.target.value) || 0)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            {mode === 'rpm' ? 'Monetized Video Views' : mode === 'earnings' ? 'Total Video Views' : 'Total Ad Impressions'}
          </label>
          <input
            type="number"
            min={1}
            value={inputB}
            onChange={(e) => setInputB(Number(e.target.value) || 0)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>
      </div>

      {/* Result Display */}
      <div className="p-6 rounded-2xl bg-[#12121A] border border-[#242436] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9090A8] block">
            {calculation.label}
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold text-[#00D4AA] font-mono mt-1 block">
            ${calculation.result}
          </span>
        </div>
        <CopyButton text={`Calculated value: $${calculation.result}`} label="Copy Metric" />
      </div>

      {/* CPM vs RPM Comparison Box */}
      <div className="p-4 rounded-xl bg-[#161620] border border-[#242436] space-y-2 text-xs text-[#9090A8]">
        <h4 className="font-bold text-[#F0F0F5] flex items-center gap-1.5">
          <ArrowRightLeft className="w-4 h-4 text-[#7C5CFC]" />
          <span>Why CPM ≠ RPM</span>
        </h4>
        <p>
          <strong>CPM (Cost Per Mille)</strong> is what advertisers pay for 1,000 ad impressions. YouTube takes 45% of that.
        </p>
        <p>
          <strong>RPM (Revenue Per Mille)</strong> is what you as the creator actually take home per 1,000 total video views after YouTube 45% cut and unmonetized views are accounted for.
        </p>
      </div>
    </div>
  );
}

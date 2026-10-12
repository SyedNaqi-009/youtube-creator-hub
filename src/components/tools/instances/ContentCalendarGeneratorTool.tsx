'use client';

import React, { useState } from 'react';
import { generateContentCalendar } from '@/lib/tool-logic';
import { Calendar, Download, CheckSquare, Square, RefreshCw } from 'lucide-react';

export function ContentCalendarGeneratorTool() {
  const [frequency, setFrequency] = useState('2x/week');
  const [niche, setNiche] = useState('Tech & Software');
  const [duration, setDuration] = useState('1 month');
  const [calendar, setCalendar] = useState<{ date: string; format: string; topic: string; completed: boolean }[]>([]);

  const handleGenerate = () => {
    const items = generateContentCalendar(frequency, niche, duration);
    setCalendar(items);
  };

  const toggleComplete = (idx: number) => {
    const updated = [...calendar];
    updated[idx].completed = !updated[idx].completed;
    setCalendar(updated);
  };

  const downloadCSV = () => {
    if (calendar.length === 0) return;
    const header = 'Date,Format,Suggested Topic,Status\n';
    const rows = calendar.map(c => `"${c.date}","${c.format}","${c.topic}","${c.completed ? 'Done' : 'Pending'}"`).join('\n');
    const encoded = encodeURI('data:text/csv;charset=utf-8,' + header + rows);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', 'youtube-content-calendar.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Upload Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          >
            <option value="daily">Daily Uploads</option>
            <option value="3x/week">3 Times / Week (Mon, Wed, Fri)</option>
            <option value="2x/week">2 Times / Week (Tue, Sat)</option>
            <option value="weekly">Weekly Uploads</option>
            <option value="biweekly">Bi-weekly (Every 2 weeks)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Channel Niche
          </label>
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
            Planning Horizon
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          >
            <option value="1 week">1 Week Sprint</option>
            <option value="2 weeks">2 Weeks</option>
            <option value="1 month">1 Full Month (30 Days)</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        type="button"
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-xs font-semibold hover:opacity-90 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center gap-2"
      >
        <Calendar className="w-4 h-4" />
        <span>Generate Publishing Calendar</span>
      </button>

      {calendar.length > 0 && (
        <div className="pt-6 border-t border-[#242436] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#F0F0F5]">
              Publishing Schedule ({calendar.length} Upload Slots)
            </h3>
            <button
              onClick={downloadCSV}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A3A] hover:border-[#00D4AA] text-xs font-medium text-[#F0F0F5] hover:text-[#00D4AA] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#242436]">
            <table className="w-full text-left text-xs text-[#9090A8]">
              <thead className="bg-[#12121A] text-[#F0F0F5] uppercase text-[10px] tracking-wider border-b border-[#242436]">
                <tr>
                  <th className="p-3 w-12 text-center">Status</th>
                  <th className="p-3 w-32">Date</th>
                  <th className="p-3 w-32">Format</th>
                  <th className="p-3">Suggested Focus Topic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242436] bg-[#161620]">
                {calendar.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#1A1A24] transition-colors">
                    <td className="p-3 text-center">
                      <button onClick={() => toggleComplete(idx)} className="text-[#7C5CFC]">
                        {item.completed ? (
                          <CheckSquare className="w-4 h-4 text-[#00D4AA] mx-auto" />
                        ) : (
                          <Square className="w-4 h-4 text-[#606078] mx-auto" />
                        )}
                      </button>
                    </td>
                    <td className="p-3 font-mono text-[#F0F0F5] whitespace-nowrap">{item.date}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-[#242436] text-[#7C5CFC] text-[10px] font-semibold">
                        {item.format}
                      </span>
                    </td>
                    <td className="p-3 text-[#F0F0F5]">{item.topic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Search, Key, AlertCircle, Users, Video, Eye, Calendar } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export function ChannelStatisticsTool() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLookup = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    setResult(null);

    try {
      const res = await fetch(`/api/youtube/channel-stats?channel=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!data.configured) {
        setResult({ configured: false, message: data.message });
      } else if (data.channel) {
        setResult({ configured: true, channel: data.channel });
      } else {
        setErrorMsg(data.message || 'Channel could not be located.');
      }
    } catch (e) {
      setErrorMsg('Failed to query statistics API route.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
          Enter YouTube Channel URL, ID, or Handle
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="e.g. @MrBeast, UCX6OQ3DkcsbYNE6H8uQQuVA, or channel link"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 text-sm bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] placeholder-[#606078] focus:outline-none focus:border-[#7C5CFC]"
          />
          <button
            onClick={handleLookup}
            type="button"
            disabled={loading || !query.trim()}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50 shadow-lg shadow-[#7C5CFC]/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <span>Querying...</span> : (
              <>
                <Search className="w-4 h-4" />
                <span>Lookup Statistics</span>
              </>
            )}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-[#FF5C5C]/10 border border-[#FF5C5C]/30 text-xs text-[#FF5C5C] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Unconfigured API Message */}
      {result && result.configured === false && (
        <div className="p-6 rounded-2xl bg-[#12121A] border border-[#FFB547]/30 space-y-3">
          <div className="flex items-center gap-2 text-[#FFB547]">
            <Key className="w-5 h-5 flex-shrink-0" />
            <h4 className="text-sm font-bold">API Key Configuration Notice</h4>
          </div>
          <p className="text-xs text-[#9090A8] leading-relaxed">
            {result.message}
          </p>
          <div className="p-3 rounded-lg bg-[#161620] text-xs font-mono text-[#F0F0F5]">
            1. Obtain a free YouTube Data API v3 key from Google Cloud Console.<br />
            2. Add <span className="text-[#00D4AA]">YOUTUBE_API_KEY=&quot;your_key_here&quot;</span> to your environment variables.<br />
            3. Restart your server or redeploy.
          </div>
        </div>
      )}

      {/* Real Statistics Display */}
      {result && result.configured && result.channel && (
        <div className="p-6 rounded-2xl bg-[#12121A] border border-[#242436] space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-[#242436]">
            {result.channel.snippet?.thumbnails?.default?.url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={result.channel.snippet.thumbnails.default.url}
                alt={result.channel.snippet?.title}
                className="w-16 h-16 rounded-full border border-[#7C5CFC]"
              />
            )}
            <div>
              <h3 className="text-lg font-bold text-[#F0F0F5]">{result.channel.snippet?.title}</h3>
              <p className="text-xs text-[#9090A8]">{result.channel.snippet?.customUrl || result.channel.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#161620] border border-[#242436] text-center">
              <Users className="w-5 h-5 text-[#7C5CFC] mx-auto mb-1" />
              <span className="text-[10px] text-[#9090A8] uppercase">Subscribers</span>
              <p className="text-xl font-bold text-[#F0F0F5]">
                {formatNumber(Number(result.channel.statistics?.subscriberCount || 0))}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#161620] border border-[#242436] text-center">
              <Eye className="w-5 h-5 text-[#00D4AA] mx-auto mb-1" />
              <span className="text-[10px] text-[#9090A8] uppercase">Total Channel Views</span>
              <p className="text-xl font-bold text-[#F0F0F5]">
                {formatNumber(Number(result.channel.statistics?.viewCount || 0))}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#161620] border border-[#242436] text-center">
              <Video className="w-5 h-5 text-[#FFB547] mx-auto mb-1" />
              <span className="text-[10px] text-[#9090A8] uppercase">Videos Published</span>
              <p className="text-xl font-bold text-[#F0F0F5]">
                {formatNumber(Number(result.channel.statistics?.videoCount || 0))}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Link2, Copy, Check, ExternalLink, RefreshCw } from 'lucide-react';
import { extractYoutubeId } from '@/lib/utils';
import CopyButton from '@/components/ui/CopyButton';

export default function UrlParserTool() {
  const [urlInput, setUrlInput] = useState('');
  const [startTime, setStartTime] = useState('0');
  const [autoplay, setAutoplay] = useState(false);
  const [loop, setLoop] = useState(false);
  const [subConfirm, setSubConfirm] = useState(false);

  const videoId = extractYoutubeId(urlInput);

  // Formatted URLs
  const standardUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : '';
  const shortUrl = videoId ? `https://youtu.be/${videoId}` : '';
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  const shortsUrl = videoId ? `https://www.youtube.com/shorts/${videoId}` : '';
  
  // Custom timestamp link
  const timestampSeconds = parseInt(startTime) || 0;
  const timeUrl = videoId ? `https://youtu.be/${videoId}?t=${timestampSeconds}` : '';
  
  // Subscribe confirmation link (works for channel/custom handle or watch)
  const subscribeUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}&sub_confirmation=1` : '';
  
  // No-cookie privacy embed
  const noCookieEmbed = videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : '';

  return (
    <div className="space-y-6">
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
        <label className="block text-sm font-semibold text-text-primary mb-2">
          Paste any YouTube URL or Video ID
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="e.g., https://youtu.be/dQw4w9WgXcQ or https://www.youtube.com/watch?v=..."
            className="flex-1 bg-surface-input border border-surface-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-purple"
          />
          {urlInput && (
            <button
              onClick={() => setUrlInput('')}
              className="px-4 py-3 bg-surface-card border border-surface-border hover:bg-surface-border rounded-xl text-xs text-text-muted hover:text-text-primary transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {videoId ? (
        <div className="space-y-6">
          {/* Extracted Details Badge */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Valid Video Detected</p>
              <p className="text-lg font-bold text-text-primary mt-1 font-mono">Video ID: {videoId}</p>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-xl text-xs font-semibold transition"
            >
              Open on YouTube <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Quick Clean Formats */}
          <div className="bg-surface-card border border-surface-border rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-text-primary">Clean Normalized URL Formats</h3>
            
            <div className="space-y-3">
              {[
                { label: 'Standard Canonical Link', url: standardUrl, desc: 'Clean link without tracking parameters' },
                { label: 'Short Shareable (youtu.be)', url: shortUrl, desc: 'Optimized for social media and character limits' },
                { label: 'Shorts URL Format', url: shortsUrl, desc: 'Opens directly in YouTube Shorts viewer' },
                { label: 'Embed Player URL', url: embedUrl, desc: 'For iframes and web players' },
                { label: 'Privacy Enhanced (No-Cookie)', url: noCookieEmbed, desc: 'Prevents tracking cookies until user plays' },
              ].map((item, idx) => (
                <div key={idx} className="bg-surface-input border border-surface-border/60 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-semibold text-brand-teal">{item.label}</span>
                    <p className="text-xs font-mono text-text-primary truncate mt-0.5">{item.url}</p>
                  </div>
                  <CopyButton text={item.url} label="Copy Link" className="shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Timestamp Generator */}
          <div className="bg-surface-card border border-surface-border rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-text-primary">Timestamp Deep Link Generator</h3>
            <p className="text-xs text-text-muted">Generate a direct link that jumps directly to a specific timestamp.</p>
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="block text-xs text-text-muted mb-1">Start at (seconds)</label>
                <input
                  type="number"
                  min="0"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-32 bg-surface-input border border-surface-border rounded-xl px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-brand-purple"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs text-text-muted mb-1">Generated Timestamp Link</label>
                <div className="flex items-center gap-2 bg-surface-input border border-surface-border rounded-xl px-3 py-2">
                  <span className="text-xs font-mono text-text-primary truncate flex-1">{timeUrl}</span>
                  <CopyButton text={timeUrl} label="Copy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : urlInput ? (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6 text-center text-rose-300 text-sm">
          Could not parse a valid YouTube Video ID from this input. Please provide a standard URL or an 11-character Video ID.
        </div>
      ) : (
        <div className="bg-surface-card border border-surface-border/50 rounded-2xl p-8 text-center text-text-muted text-sm">
          Paste a YouTube link above to clean parameters, generate timestamp links, and extract standard formats.
        </div>
      )}
    </div>
  );
}

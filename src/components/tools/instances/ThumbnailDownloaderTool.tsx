'use client';

import React, { useState } from 'react';
import { extractYoutubeId } from '@/lib/utils';
import { CopyButton } from '@/components/ui/CopyButton';
import { Download, AlertCircle, Image as ImageIcon } from 'lucide-react';

export function ThumbnailDownloaderTool() {
  const [inputUrl, setInputUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExtract = () => {
    setError(null);
    const id = extractYoutubeId(inputUrl);
    if (!id) {
      setError('Please enter a valid YouTube video URL, Shorts link, or 11-character video ID.');
      setVideoId(null);
      return;
    }
    setVideoId(id);
  };

  const resolutions = videoId ? [
    { label: 'Maximum Resolution (1280×720 HD)', key: 'maxresdefault', width: 1280, height: 720 },
    { label: 'Standard Definition (640×480 SD)', key: 'sddefault', width: 640, height: 480 },
    { label: 'High Quality (480×360 HQ)', key: 'hqdefault', width: 480, height: 360 },
    { label: 'Medium Quality (320×180 MQ)', key: 'mqdefault', width: 320, height: 180 },
    { label: 'Default / Thumbnail (120×90)', key: 'default', width: 120, height: 90 },
  ] : [];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-2">
          YouTube Video or Shorts URL
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or Shorts link"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-1 px-4 py-2.5 text-sm bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] placeholder-[#606078] focus:outline-none focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC]"
          />
          <button
            onClick={handleExtract}
            type="button"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6042E0] text-white text-sm font-semibold hover:opacity-90 shadow-lg shadow-[#7C5CFC]/20 transition-all"
          >
            Extract Thumbnails
          </button>
        </div>
        {error && (
          <p className="mt-2 text-xs text-[#FF5C5C] flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            {error}
          </p>
        )}
      </div>

      {videoId && (
        <div className="pt-6 border-t border-[#242436] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#F0F0F5]">
              Extracted Video ID: <code className="text-[#00D4AA] px-1.5 py-0.5 rounded bg-[#12121A]">{videoId}</code>
            </h3>
            <span className="text-xs text-[#9090A8]">5 Resolutions Available</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resolutions.map((res) => {
              const imgUrl = `https://img.youtube.com/vi/${videoId}/${res.key}.jpg`;
              return (
                <div key={res.key} className="p-4 rounded-xl bg-[#12121A] border border-[#242436] flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#F0F0F5]">{res.label}</span>
                      <span className="text-[10px] text-[#9090A8] font-mono">{res.width}×{res.height}</span>
                    </div>
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-[#161620] relative border border-[#242436]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imgUrl}
                        alt={`YouTube thumbnail ${res.key}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[#242436]/60">
                    <a
                      href={imgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={`youtube-thumbnail-${videoId}-${res.key}.jpg`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#7C5CFC]/20 text-[#7C5CFC] hover:bg-[#7C5CFC]/30 border border-[#7C5CFC]/30 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                    <CopyButton text={imgUrl} label="Copy URL" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

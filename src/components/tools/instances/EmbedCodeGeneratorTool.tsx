'use client';

import React, { useState } from 'react';
import { extractYoutubeId } from '@/lib/utils';
import { Code, Copy, Monitor, Play, Sliders } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

export function EmbedCodeGeneratorTool() {
  const [urlOrId, setUrlOrId] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [width, setWidth] = useState(560);
  const [height, setHeight] = useState(315);
  const [autoplay, setAutoplay] = useState(false);
  const [controls, setControls] = useState(true);
  const [loop, setLoop] = useState(false);
  const [modestBranding, setModestBranding] = useState(true);
  const [responsiveWrapper, setResponsiveWrapper] = useState(true);
  const [startTime, setStartTime] = useState(0);

  const videoId = extractYoutubeId(urlOrId) || 'dQw4w9WgXcQ';

  // Construct iframe embed src
  const params = new URLSearchParams();
  if (autoplay) params.set('autoplay', '1');
  if (!controls) params.set('controls', '0');
  if (loop) {
    params.set('loop', '1');
    params.set('playlist', videoId);
  }
  if (modestBranding) params.set('modestbranding', '1');
  if (startTime > 0) params.set('start', startTime.toString());

  const queryString = params.toString() ? `?${params.toString()}` : '';
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}${queryString}`;

  const rawIframe = `<iframe width="${width}" height="${height}" src="${embedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;

  const finalCode = responsiveWrapper
    ? `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;border-radius:12px;">\n  <iframe src="${embedUrl}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>\n</div>`
    : rawIframe;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1.5">
          YouTube Video URL or Video ID *
        </label>
        <input
          type="text"
          value={urlOrId}
          onChange={(e) => setUrlOrId(e.target.value)}
          placeholder="Paste YouTube link here..."
          className="w-full px-4 py-2.5 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
        />
      </div>

      {/* Customization Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-xl bg-[#12121A] border border-[#242436]">
        <div>
          <label className="block text-xs font-semibold text-[#9090A8] mb-1">Start Time (Seconds)</label>
          <input
            type="number"
            min={0}
            value={startTime}
            onChange={(e) => setStartTime(Number(e.target.value) || 0)}
            className="w-full px-3 py-1.5 text-xs bg-[#161620] border border-[#2A2A3A] rounded-lg text-[#F0F0F5]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#9090A8] mb-1">Fixed Width (px)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value) || 560)}
            disabled={responsiveWrapper}
            className="w-full px-3 py-1.5 text-xs bg-[#161620] border border-[#2A2A3A] rounded-lg text-[#F0F0F5] disabled:opacity-40"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#9090A8] mb-1">Fixed Height (px)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value) || 315)}
            disabled={responsiveWrapper}
            className="w-full px-3 py-1.5 text-xs bg-[#161620] border border-[#2A2A3A] rounded-lg text-[#F0F0F5] disabled:opacity-40"
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-4 pt-1">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-[#F0F0F5]">
          <input
            type="checkbox"
            checked={responsiveWrapper}
            onChange={(e) => setResponsiveWrapper(e.target.checked)}
            className="rounded border-[#2A2A3A] text-[#7C5CFC]"
          />
          <span>Responsive 16:9 CSS Container (Recommended)</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-xs text-[#F0F0F5]">
          <input
            type="checkbox"
            checked={controls}
            onChange={(e) => setControls(e.target.checked)}
            className="rounded border-[#2A2A3A] text-[#7C5CFC]"
          />
          <span>Show Player Controls</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-xs text-[#F0F0F5]">
          <input
            type="checkbox"
            checked={autoplay}
            onChange={(e) => setAutoplay(e.target.checked)}
            className="rounded border-[#2A2A3A] text-[#7C5CFC]"
          />
          <span>Autoplay on Load</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-xs text-[#F0F0F5]">
          <input
            type="checkbox"
            checked={loop}
            onChange={(e) => setLoop(e.target.checked)}
            className="rounded border-[#2A2A3A] text-[#7C5CFC]"
          />
          <span>Loop Video Playback</span>
        </label>
      </div>

      {/* Live Preview */}
      <div className="p-4 rounded-xl bg-[#12121A] border border-[#242436] space-y-3">
        <span className="text-xs font-semibold text-[#9090A8] block">Live Embedded Preview</span>
        <div className="aspect-video w-full max-w-xl mx-auto rounded-xl overflow-hidden bg-black border border-[#2A2A3A]">
          <iframe
            src={embedUrl}
            title="Preview"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Generated Code */}
      <div className="pt-2 border-t border-[#242436] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7C5CFC]">
            Generated HTML Embed Code
          </span>
          <CopyButton text={finalCode} label="Copy Embed Code" />
        </div>
        <pre className="p-4 rounded-xl bg-[#12121A] border border-[#242436] text-xs font-mono text-[#F0F0F5] whitespace-pre-wrap leading-relaxed overflow-x-auto">
          {finalCode}
        </pre>
      </div>
    </div>
  );
}

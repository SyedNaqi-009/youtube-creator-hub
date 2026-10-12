'use client';

import React, { useState } from 'react';
import { Monitor, Smartphone, Search, Play, Clock, Upload } from 'lucide-react';

export function ThumbnailPreviewTool() {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [mockTitle, setMockTitle] = useState('How I Scaled My YouTube Channel to 100K Subscribers');
  const [mockChannel, setMockChannel] = useState('Creator Studio');
  const [activeTab, setActiveTab] = useState<'desktop' | 'mobile' | 'search' | 'sidebar'>('desktop');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-2">
            Upload Thumbnail or Image
          </label>
          <div className="flex items-center gap-2">
            <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-[#2A2A3A] hover:border-[#7C5CFC] bg-[#12121A] text-xs text-[#9090A8] hover:text-[#F0F0F5] transition-colors">
              <Upload className="w-4 h-4 text-[#7C5CFC]" />
              <span>Choose Image (PNG, JPG)</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-2">
            Or Paste Direct Image URL
          </label>
          <input
            type="text"
            placeholder="https://example.com/thumbnail.jpg"
            value={imageSrc.startsWith('data:') ? '' : imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
            className="w-full px-4 py-2.5 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-xl text-[#F0F0F5] placeholder-[#606078] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1">
            Mock Video Title
          </label>
          <input
            type="text"
            value={mockTitle}
            onChange={(e) => setMockTitle(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-lg text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9090A8] mb-1">
            Mock Channel Name
          </label>
          <input
            type="text"
            value={mockChannel}
            onChange={(e) => setMockChannel(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#12121A] border border-[#2A2A3A] rounded-lg text-[#F0F0F5] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>
      </div>

      {/* Context Tabs */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-[#242436]">
        <button
          onClick={() => setActiveTab('desktop')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'desktop' ? 'bg-[#7C5CFC] text-white' : 'bg-[#12121A] text-[#9090A8] hover:text-[#F0F0F5]'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Desktop Home Feed</span>
        </button>
        <button
          onClick={() => setActiveTab('mobile')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'mobile' ? 'bg-[#7C5CFC] text-white' : 'bg-[#12121A] text-[#9090A8] hover:text-[#F0F0F5]'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile App Feed</span>
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'search' ? 'bg-[#7C5CFC] text-white' : 'bg-[#12121A] text-[#9090A8] hover:text-[#F0F0F5]'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search Results</span>
        </button>
      </div>

      {/* Mock YouTube Viewport */}
      <div className="p-6 rounded-xl bg-[#0F0F12] border border-[#242436] flex justify-center items-center min-h-[300px]">
        {activeTab === 'desktop' && (
          <div className="w-full max-w-sm rounded-xl overflow-hidden bg-[#161620] border border-[#242436]">
            <div className="aspect-video w-full bg-[#12121A] relative flex items-center justify-center overflow-hidden">
              {imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageSrc} alt="Thumbnail preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-[#606078]">Upload image above to preview</span>
              )}
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                12:45
              </span>
            </div>
            <div className="p-3 flex gap-3">
              <div className="w-9 h-9 rounded-full bg-[#7C5CFC]/30 flex-shrink-0 flex items-center justify-center text-xs font-bold text-[#7C5CFC]">
                {mockChannel.charAt(0)}
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#F0F0F5] line-clamp-2 leading-snug">
                  {mockTitle}
                </h4>
                <p className="text-[11px] text-[#9090A8] mt-1">{mockChannel}</p>
                <p className="text-[10px] text-[#606078]">142K views · 3 days ago</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mobile' && (
          <div className="w-full max-w-[320px] rounded-2xl overflow-hidden bg-[#161620] border-2 border-[#2A2A3A] shadow-2xl">
            <div className="aspect-video w-full bg-[#12121A] relative flex items-center justify-center overflow-hidden">
              {imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageSrc} alt="Mobile thumbnail preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[11px] text-[#606078]">Mobile mockup placeholder</span>
              )}
              <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[9px] px-1 rounded font-mono">
                12:45
              </span>
            </div>
            <div className="p-2.5 flex gap-2">
              <div className="w-7 h-7 rounded-full bg-[#7C5CFC]/30 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-[#7C5CFC]">
                {mockChannel.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="text-[11px] font-bold text-[#F0F0F5] line-clamp-2 leading-tight">
                  {mockTitle}
                </h4>
                <p className="text-[10px] text-[#9090A8] mt-0.5">{mockChannel} · 142K views</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="w-full max-w-xl p-3 rounded-xl bg-[#161620] border border-[#242436] flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-56 aspect-video bg-[#12121A] rounded-lg overflow-hidden relative flex-shrink-0 flex items-center justify-center">
              {imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageSrc} alt="Search thumbnail preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] text-[#606078]">Search item</span>
              )}
              <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[9px] px-1 rounded font-mono">
                12:45
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="text-xs sm:text-sm font-bold text-[#F0F0F5] line-clamp-2 leading-snug">
                {mockTitle}
              </h4>
              <p className="text-[11px] text-[#9090A8] mt-1">{mockChannel} · 142K views · 3 days ago</p>
              <p className="text-[10px] text-[#606078] mt-2 line-clamp-2">
                Learn the step-by-step framework to scale your video views, boost CTR, and dominate YouTube search recommendations.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

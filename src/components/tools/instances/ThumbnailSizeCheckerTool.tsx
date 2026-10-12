'use client';

import React, { useState } from 'react';
import { Upload, CheckCircle2, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';

interface DiagnosticResult {
  width: number;
  height: number;
  aspectRatio: number;
  fileSizeBytes: number;
  fileType: string;
}

export function ThumbnailSizeCheckerTool() {
  const [fileData, setFileData] = useState<DiagnosticResult | null>(null);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      setFileData({
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: Number((img.naturalWidth / img.naturalHeight).toFixed(2)),
        fileSizeBytes: file.size,
        fileType: file.type
      });
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  };

  const isResPass = fileData ? fileData.width >= 1280 && fileData.height >= 720 : false;
  const isRatioPass = fileData ? Math.abs(fileData.aspectRatio - 1.78) <= 0.05 : false;
  const isSizePass = fileData ? fileData.fileSizeBytes <= 2 * 1024 * 1024 : false;
  const isTypePass = fileData ? ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(fileData.fileType) : false;

  return (
    <div className="space-y-6">
      <div className="p-8 rounded-2xl border-2 border-dashed border-[#2A2A3A] hover:border-[#7C5CFC] bg-[#12121A] text-center transition-all">
        <Upload className="w-8 h-8 text-[#7C5CFC] mx-auto mb-3" />
        <h3 className="text-sm font-semibold text-[#F0F0F5] mb-1">
          Select or drop your thumbnail image
        </h3>
        <p className="text-xs text-[#9090A8] mb-4">
          Accepts JPG, PNG, GIF, BMP. Tested client-side in your browser.
        </p>
        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7C5CFC] hover:bg-[#6948F2] text-white text-xs font-semibold cursor-pointer shadow-lg shadow-[#7C5CFC]/20 transition-all">
          <span>Choose Image File</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {fileData && (
        <div className="p-5 rounded-xl bg-[#12121A] border border-[#242436] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#242436]">
            <div>
              <span className="text-xs text-[#9090A8]">Inspected File:</span>
              <h4 className="text-sm font-bold text-[#F0F0F5]">{fileName}</h4>
            </div>
            <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
              isResPass && isRatioPass && isSizePass && isTypePass
                ? 'bg-[#00D4AA]/20 text-[#00D4AA]'
                : 'bg-[#FF5C5C]/20 text-[#FF5C5C]'
            }`}>
              {isResPass && isRatioPass && isSizePass && isTypePass ? '100% YouTube Ready' : 'Issues Found'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Resolution Check */}
            <div className="p-3 rounded-lg bg-[#161620] border border-[#242436] flex items-start gap-3">
              {isResPass ? <CheckCircle2 className="w-5 h-5 text-[#00D4AA] flex-shrink-0" /> : <XCircle className="w-5 h-5 text-[#FF5C5C] flex-shrink-0" />}
              <div>
                <p className="text-xs font-semibold text-[#F0F0F5]">Dimensions (1280×720 recommended)</p>
                <p className="text-[11px] text-[#9090A8]">Current: {fileData.width} × {fileData.height} px</p>
                {!isResPass && <p className="text-[10px] text-[#FF5C5C] mt-1">Resolution is below the recommended 1280x720.</p>}
              </div>
            </div>

            {/* Aspect Ratio Check */}
            <div className="p-3 rounded-lg bg-[#161620] border border-[#242436] flex items-start gap-3">
              {isRatioPass ? <CheckCircle2 className="w-5 h-5 text-[#00D4AA] flex-shrink-0" /> : <XCircle className="w-5 h-5 text-[#FF5C5C] flex-shrink-0" />}
              <div>
                <p className="text-xs font-semibold text-[#F0F0F5]">Aspect Ratio (16:9 widescreen)</p>
                <p className="text-[11px] text-[#9090A8]">Current Ratio: {fileData.aspectRatio}:1</p>
                {!isRatioPass && <p className="text-[10px] text-[#FF5C5C] mt-1">Image is not 16:9; YouTube may add black bars.</p>}
              </div>
            </div>

            {/* File Size Check */}
            <div className="p-3 rounded-lg bg-[#161620] border border-[#242436] flex items-start gap-3">
              {isSizePass ? <CheckCircle2 className="w-5 h-5 text-[#00D4AA] flex-shrink-0" /> : <XCircle className="w-5 h-5 text-[#FF5C5C] flex-shrink-0" />}
              <div>
                <p className="text-xs font-semibold text-[#F0F0F5]">File Weight (Max 2.0 MB)</p>
                <p className="text-[11px] text-[#9090A8]">Current: {(fileData.fileSizeBytes / (1024 * 1024)).toFixed(2)} MB</p>
                {!isSizePass && <p className="text-[10px] text-[#FF5C5C] mt-1">File exceeds YouTube 2MB limit. Compress to upload.</p>}
              </div>
            </div>

            {/* File Format Check */}
            <div className="p-3 rounded-lg bg-[#161620] border border-[#242436] flex items-start gap-3">
              {isTypePass ? <CheckCircle2 className="w-5 h-5 text-[#00D4AA] flex-shrink-0" /> : <XCircle className="w-5 h-5 text-[#FF5C5C] flex-shrink-0" />}
              <div>
                <p className="text-xs font-semibold text-[#F0F0F5]">Format (JPG, PNG, GIF, BMP)</p>
                <p className="text-[11px] text-[#9090A8]">Current: {fileData.fileType || 'Unknown'}</p>
                {!isTypePass && <p className="text-[10px] text-[#FF5C5C] mt-1">Convert image to JPG or PNG before uploading.</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

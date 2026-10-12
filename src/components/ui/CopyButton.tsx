'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, label = 'Copy', className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 border border-[#2A2A3A] hover:border-[#7C5CFC] bg-[#161620] hover:bg-[#1F1F2E] text-[#F0F0F5] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC] ${className}`}
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-[#00D4AA]" />
          <span className="text-[#00D4AA]">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-[#9090A8]" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

export default CopyButton;

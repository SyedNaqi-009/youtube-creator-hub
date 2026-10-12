'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setIsLight(true);
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggle = () => {
    if (isLight) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      setIsLight(false);
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      setIsLight(true);
    }
  };

  return (
    <button
      onClick={toggle}
      type="button"
      className="p-2 rounded-lg border border-[#2A2A3A] hover:border-[#7C5CFC] bg-[#161620] text-[#9090A8] hover:text-[#F0F0F5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]"
      aria-label="Toggle Dark and Light theme"
      title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      {isLight ? <Moon className="w-4 h-4 text-[#7C5CFC]" /> : <Sun className="w-4 h-4 text-[#FFB547]" />}
    </button>
  );
}

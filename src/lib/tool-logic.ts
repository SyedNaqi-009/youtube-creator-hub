// Tool 4: Title Generator
export function generateTitles(
  topic: string,
  audience: string = '',
  videoType: string = 'Tutorial',
  tone: string = 'Exciting'
): { title: string; length: number; status: 'green' | 'yellow' | 'red' }[] {
  const cleanTopic = topic.trim() || 'Content Creation';
  const cleanAudience = audience.trim() || 'Creators';
  const year = new Date().getFullYear();

  const templates: string[] = [
    `How to Master ${cleanTopic} in Under 10 Minutes`,
    `Stop Making This ${cleanTopic} Mistake Right Now`,
    `The Truth About ${cleanTopic} Nobody Tells You`,
    `I Tried ${cleanTopic} for 30 Days — Here Is What Happened`,
    `${cleanTopic} for Beginners: Complete Step-by-Step Guide (${year})`,
    `7 Game-Changing ${cleanTopic} Secrets That Actually Work`,
    `Why ${cleanAudience} Are Obsessed With ${cleanTopic}`,
    `${cleanTopic} vs Everything Else: The Ultimate Test`,
    `The Only ${cleanTopic} Blueprint You Will Ever Need`,
    `How I Fixed My Biggest ${cleanTopic} Problem in 24 Hours`,
    `Do NOT Start ${cleanTopic} Before Watching This`,
    `Is ${cleanTopic} Still Worth It in ${year}? (Honest Breakdown)`
  ];

  return templates.map((title) => {
    const length = title.length;
    let status: 'green' | 'yellow' | 'red' = 'green';
    if (length > 70) status = 'red';
    else if (length > 60) status = 'yellow';
    return { title, length, status };
  });
}

// Tool 5: Description Generator
export function generateDescription(params: {
  title: string;
  topic: string;
  keyPoints: string;
  links: string;
  ctaType: string;
  includeTimestamps: boolean;
  includeAffiliate: boolean;
}): string {
  const points = params.keyPoints
    ? params.keyPoints.split('\n').filter(p => p.trim()).map(p => `• ${p.trim()}`).join('\n')
    : '• Complete walkthrough and strategic breakdown\n• Practical workflows you can apply immediately\n• Key tools, best practices, and pro recommendations';

  const ctaMap: Record<string, string> = {
    'Subscribe': '🔔 If you found this valuable, hit Subscribe and turn on notifications for more creator guides!',
    'Like & Comment': '👍 Drop a Like if this helped, and let me know your biggest question in the comments below!',
    'Visit Website': '🌐 Explore our free companion resources and tools here: https://creatorhub.tools',
    'Follow Social Media': '📱 Connect with me across socials for behind-the-scenes insights: @creatorhandle',
    'Check Playlist': '▶️ Watch the complete video series here: https://youtube.com/playlist?list=sample'
  };

  const ctaText = ctaMap[params.ctaType] || ctaMap['Subscribe'];

  let desc = `In this video, we break down everything you need to know about ${params.topic || 'this topic'}. Whether you are just getting started or scaling your process, these actionable insights will save you hours.\n\n`;

  if (params.includeTimestamps) {
    desc += `TIMESTAMPS:\n0:00 Introduction & Quick Overview\n1:15 Core Strategy Explained\n4:30 Step-by-Step Demonstration\n8:15 Pro Tips & Common Mistakes\n11:00 Final Takeaways & Next Steps\n\n`;
  }

  desc += `KEY POINTS COVERED:\n${points}\n\n`;
  desc += `${ctaText}\n\n`;

  if (params.links.trim()) {
    desc += `HELPFUL LINKS & RESOURCES:\n${params.links.trim()}\n\n`;
  }

  if (params.includeAffiliate) {
    desc += `DISCLOSURE: Some links above may be affiliate links. If you make a purchase through them, we may earn a small commission at no additional cost to you.\n\n`;
  }

  const tags = `#${(params.topic || 'Creators').replace(/[^a-zA-Z0-9]/g, '')} #YouTubeTips #CreatorEconomy`;
  desc += tags;

  return desc;
}

// Tool 6: Tag Generator
export function generateTags(topic: string, secondary: string = ''): { exact: string[]; broad: string[]; longTail: string[] } {
  const clean = topic.trim() || 'youtube channel';
  const sec = secondary.trim();
  const year = new Date().getFullYear();

  return {
    exact: [
      clean,
      `${clean} ${year}`,
      `best ${clean}`,
      `how to ${clean}`
    ],
    broad: [
      `${clean} tips`,
      `${clean} tutorial`,
      `${clean} guide`,
      `${clean} for beginners`,
      `${clean} explained`,
      `${clean} review`
    ],
    longTail: [
      `how to start ${clean} step by step`,
      `best ${clean} strategy for ${year}`,
      `${clean} mistakes to avoid`,
      `complete guide to ${clean}`,
      sec ? `${clean} with ${sec}` : `${clean} walkthrough`,
      `top secrets of ${clean}`
    ]
  };
}

// Tool 7: Hashtag Generator
export function generateHashtags(topic: string, isShorts: boolean): string[] {
  const clean = topic.replace(/[^a-zA-Z0-9]/g, '');
  const word = clean.charAt(0).toUpperCase() + clean.slice(1);

  if (isShorts) {
    return [
      '#Shorts',
      '#YouTubeShorts',
      `#${word}Shorts`,
      `#${word}`,
      '#ShortsFeed',
      '#ViralShorts',
      '#Creator',
      '#Trending'
    ];
  }

  return [
    `#${word}`,
    `#${word}Tips`,
    `#${word}Tutorial`,
    '#YouTubeCreator',
    '#ContentCreator',
    '#VideoTips'
  ];
}

// Tool 10: Keyword Ideas
export function generateKeywordIdeas(seed: string): {
  questions: string[];
  howTo: string[];
  comparisons: string[];
  longTail: string[];
} {
  const kw = seed.trim() || 'video editing';
  const year = new Date().getFullYear();

  return {
    questions: [
      `is ${kw} worth it in ${year}?`,
      `how does ${kw} work for beginners?`,
      `why is ${kw} so popular?`,
      `can anyone learn ${kw}?`,
      `what is the easiest way to do ${kw}?`
    ],
    howTo: [
      `how to do ${kw} at home`,
      `how to master ${kw} in 30 days`,
      `how to set up ${kw} step by step`,
      `how to avoid mistakes with ${kw}`
    ],
    comparisons: [
      `${kw} vs alternative solutions`,
      `free vs paid tools for ${kw}`,
      `${kw} before and after results`,
      `best software for ${kw}`
    ],
    longTail: [
      `${kw} full course for beginners`,
      `ultimate ${kw} workflow checklist`,
      `secrets to faster ${kw}`,
      `${kw} best practices for ${year}`
    ]
  };
}

// Tool 11: Keyword Combinations
export function combineKeywordLists(lists: string[][]): string[] {
  const filtered = lists.map(l => l.map(s => s.trim()).filter(Boolean)).filter(l => l.length > 0);
  if (filtered.length === 0) return [];

  let results: string[] = filtered[0];

  for (let i = 1; i < filtered.length; i++) {
    const current = filtered[i];
    const nextCombos: string[] = [];
    for (const r of results) {
      for (const c of current) {
        nextCombos.push(`${r} ${c}`);
      }
    }
    results = nextCombos;
  }

  return Array.from(new Set(results));
}

// Tool 13: Title A/B Generator
export function generateABTitlePairs(topic: string, audience: string = ''): {
  label: string;
  titleA: string;
  titleB: string;
}[] {
  const t = topic.trim() || 'YouTube Strategy';
  const a = audience.trim() || 'Beginners';

  return [
    {
      label: 'Curiosity Gap vs Direct Benefit',
      titleA: `The Secret to ${t} That Nobody Talks About`,
      titleB: `How to Double Your Results with ${t} Today`
    },
    {
      label: 'Number Listicle vs Contrarian Hook',
      titleA: `5 Simple ${t} Tips That Actually Work`,
      titleB: `Why Most ${a} Fail at ${t} (And What to Do)`
    },
    {
      label: 'Timeframe Promise vs Warning Callout',
      titleA: `Master ${t} in Just 15 Minutes a Day`,
      titleB: `Stop Doing ${t} Until You Watch This Video`
    },
    {
      label: 'Real Story Case Study vs Ultimate Guide',
      titleA: `I Tested ${t} for 30 Days: Honest Results`,
      titleB: `The Ultimate ${t} Blueprint for ${a}`
    },
    {
      label: 'Comparison vs Question Angle',
      titleA: `${t}: Is It Still Worth Your Time?`,
      titleB: `The Good, Bad, and Ugly Truth About ${t}`
    }
  ];
}

// Tool 14: Earnings Calculator
export function calculateEarnings(views: number, rpm: number, monetizedPercent: number) {
  const monetizedViews = views * (monetizedPercent / 100);
  const total = (monetizedViews * rpm) / 1000;
  return {
    daily: total,
    monthly: total * 30.42,
    yearly: total * 365
  };
}

// Tool 16: Engagement Rate
export function calculateEngagementRate(views: number, likes: number, comments: number, shares: number = 0) {
  if (views <= 0) return { rate: 0, status: 'No views' };
  const rate = ((likes + comments + shares) / views) * 100;

  let benchmark = 'Low (0-2%)';
  let badgeColor = 'red';
  if (rate >= 10) {
    benchmark = 'Excellent (10%+)';
    badgeColor = 'teal';
  } else if (rate >= 5) {
    benchmark = 'Good (5-10%)';
    badgeColor = 'purple';
  } else if (rate >= 2) {
    benchmark = 'Average (2-5%)';
    badgeColor = 'amber';
  }

  return {
    rate: Number(rate.toFixed(2)),
    benchmark,
    badgeColor,
    likeRatio: Number(((likes / views) * 100).toFixed(2)),
    commentRatio: Number(((comments / views) * 100).toFixed(2))
  };
}

// Tool 18: CPM and RPM
export function calculateCpmRpm(mode: 'rpm' | 'earnings' | 'cpm', valA: number, valB: number) {
  if (mode === 'rpm') {
    // valA: earnings, valB: monetized views
    const rpm = valB > 0 ? (valA / valB) * 1000 : 0;
    return { result: Number(rpm.toFixed(2)), label: 'Calculated RPM ($)' };
  } else if (mode === 'earnings') {
    // valA: rpm, valB: views
    const earnings = (valB * valA) / 1000;
    return { result: Number(earnings.toFixed(2)), label: 'Estimated Gross Revenue ($)' };
  } else {
    // valA: advertiser cost, valB: impressions
    const cpm = valB > 0 ? (valA / valB) * 1000 : 0;
    return { result: Number(cpm.toFixed(2)), label: 'Advertiser CPM ($)' };
  }
}

// Tool 20: Shorts Titles
export function generateShortsTitles(topic: string, niche: string): string[] {
  const clean = topic.trim() || 'Life Hack';
  return [
    `Wait for it… ${clean}!`,
    `POV: You discover ${clean}`,
    `${clean} in 60 Seconds flat`,
    `Things only ${niche || 'creators'} understand`,
    `Did you know this about ${clean}?`,
    `The 5-second ${clean} shortcut`,
    `Watch until the end for ${clean}`,
    `Stop scrolling! ${clean} check`,
    `Is this the craziest ${clean} trick?`,
    `Never do ${clean} without this`
  ];
}

// Tool 21: Shorts Hooks
export function generateShortsHooks(topic: string, style: string): { text: string; rationale: string }[] {
  const t = topic.trim() || 'this habit';

  const hookStyles: Record<string, { text: string; rationale: string }[]> = {
    'Question': [
      { text: `Did you know that 90% of people do ${t} wrong?`, rationale: 'Questions trigger cognitive curiosity, demanding an answer before swiping.' },
      { text: `What if I told you ${t} is actually making things worse?`, rationale: 'Challenges baseline beliefs to keep viewer attention anchored.' }
    ],
    'Shocking Statement': [
      { text: `This is why you must never touch ${t} again.`, rationale: 'Extreme consequence warnings evoke urgent risk-avoidance instincts.' },
      { text: `I spent 100 hours testing ${t} so you do not have to.`, rationale: 'High perceived effort creates high immediate perceived value.' }
    ],
    'Controversial Take': [
      { text: `Everyone loves ${t}, but here is the brutal truth.`, rationale: 'Contrarian takes stand out against standard consensus video feeds.' },
      { text: `Stop listening to gurus about ${t}.`, rationale: 'Positions the creator as an honest insider looking out for the viewer.' }
    ],
    'Quick Tip': [
      { text: `Here is the single fastest way to fix ${t}.`, rationale: 'Promises instant efficiency and low barrier to entry.' },
      { text: `Steal this 10-second cheat code for ${t}.`, rationale: 'Viewer perceives an unfair secret advantage.' }
    ]
  };

  return hookStyles[style] || [
    { text: `Watch what happens when you do ${t} for 7 days.`, rationale: 'Creates an immediate curiosity cliffhanger.' },
    { text: `The biggest secret behind ${t} finally explained.`, rationale: 'Appeals to viewer desire for insider knowledge.' },
    { text: `If you do ${t}, you need to hear this right now.`, rationale: 'Directly addresses and qualifies the target audience.' }
  ];
}

// Tool 23: Video Ideas
export function generateVideoIdeas(topic: string, format: string) {
  const t = topic.trim() || 'Creator Strategy';

  return [
    {
      title: `The Ultimate Beginner Guide to ${t}`,
      concept: `A comprehensive foundation covering the essentials, common traps, and recommended first steps for newcomers.`,
      format: format || 'Tutorial'
    },
    {
      title: `I Tested 5 Popular ${t} Tools (Only 1 Was Good)`,
      concept: `Hands-on side-by-side comparison of tools, rating pricing, speed, and real-world results.`,
      format: 'Review'
    },
    {
      title: `The Untold Truth About ${t} in 2026`,
      concept: `Deep dive into industry shifts, algorithm updates, and what actually drives sustainable results now.`,
      format: 'Educational'
    },
    {
      title: `Can You Learn ${t} in Just 24 Hours?`,
      concept: `High-retention challenge format chronicling an intensive learning sprint with candid struggles and breakthroughs.`,
      format: 'Challenge'
    },
    {
      title: `Reacting to the Most Viral ${t} Advice`,
      concept: `Reviewing top trending posts or shorts, providing expert commentary on what is legit and what is bad advice.`,
      format: 'Reaction'
    }
  ];
}

// Tool 25: Content Calendar Generator
export function generateContentCalendar(frequency: string, niche: string, duration: string) {
  const days = duration === '1 month' ? 30 : duration === '2 weeks' ? 14 : 7;
  const items = [];
  const formats = ['Tutorial', 'Deep Dive Review', 'YouTube Short', 'Case Study', 'Q&A / Community'];
  const baseDate = new Date();

  let step = 1;
  if (frequency === 'weekly') step = 7;
  else if (frequency === '3x/week') step = 2;
  else if (frequency === '2x/week') step = 3;
  else if (frequency === 'biweekly') step = 14;

  for (let i = 0; i < days; i += step) {
    const uploadDate = new Date(baseDate);
    uploadDate.setDate(baseDate.getDate() + i);
    const format = formats[(i / step) % formats.length];

    items.push({
      date: uploadDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' }),
      format,
      topic: `${format}: Mastering ${niche || 'Your Craft'} — Phase ${Math.floor(i / step) + 1}`,
      completed: false
    });
  }

  return items;
}

// Tool 26: Script Outline
export function generateScriptOutline(topic: string, length: string, points: string) {
  const t = topic.trim() || 'Video Topic';
  const customPoints = points
    ? points.split('\n').filter(Boolean).map(p => `• Point: ${p.trim()}`).join('\n')
    : `• Main Concept Breakdown & Background\n• Real-world Step-by-Step Walkthrough\n• Pro Tips to Accelerate Results\n• Mistakes to Avoid`;

  return `VIDEO SCRIPT OUTLINE: ${t}
Target Length: ${length || 'Medium (5-15 min)'}

1. THE HOOK (0:00 - 0:15)
   - State the core transformation or question immediately.
   - Show proof, outcome preview, or dramatic premise.
   - Eliminate filler ("Hey guys welcome back").

2. THE INTRO & VALUE PROMISE (0:15 - 0:45)
   - Explain why this matters right now.
   - Briefly outline what viewer will walk away with.

3. CORE SEGMENTS (0:45 - Midpoint)
${customPoints}

4. ENGAGEMENT BREAK / MID-ROLL CTA (At ~40% mark)
   - Prompt viewers: "If you found this specific tip helpful, leave a comment below!"
   - Reference related video or free resource.

5. ADVANCED TIPS & CONCLUSION (Toward end)
   - Address edge cases and pro-level adjustments.
   - Summarize key actionable takeaways.

6. OUTRO & END SCREEN CUE (Final 20 seconds)
   - Direct viewers straight into the next recommended video.
   - Trigger end screen element overlay.`;
}

// Tool 27: Sponsorship Calculator
export function calculateSponsorshipRate(views: number, niche: string, type: string) {
  let cpvMin = 0.03;
  let cpvMax = 0.08;

  if (niche === 'Finance' || niche === 'Business' || niche === 'Tech') {
    cpvMin = 0.10;
    cpvMax = 0.25;
  } else if (niche === 'Gaming' || niche === 'Vlog') {
    cpvMin = 0.02;
    cpvMax = 0.05;
  }

  let typeMultiplier = 1.0; // 60s integration
  if (type === 'Dedicated video') typeMultiplier = 2.5;
  if (type === 'Shorts sponsorship') typeMultiplier = 0.6;
  if (type === 'Pre-roll') typeMultiplier = 0.7;

  const low = Math.round(views * cpvMin * typeMultiplier);
  const mid = Math.round(views * ((cpvMin + cpvMax) / 2) * typeMultiplier);
  const high = Math.round(views * cpvMax * typeMultiplier);

  return { low, mid, high };
}

// Tool 29: Channel Name Generator
export function generateChannelNames(topic: string, style: string): string[] {
  const t = topic.trim() || 'Tech';
  const clean = t.charAt(0).toUpperCase() + t.slice(1);

  if (style === 'Playful') {
    return [
      `${clean}Lab`, `Pixel${clean}`, `${clean}Vibes`, `The ${clean}Geek`,
      `${clean}Sparks`, `Crafty${clean}`, `Epic${clean}`, `${clean}Zone`,
      `The Daily ${clean}`, `Happy${clean}`, `${clean}Factory`, `FunWith${clean}`
    ];
  } else if (style === 'Professional') {
    return [
      `${clean}Pulse`, `Apex ${clean}`, `The ${clean}Institute`, `${clean}Strategy`,
      `Prime${clean}`, `${clean}Insights`, `Nexus ${clean}`, `${clean}Pro Media`,
      `Global ${clean}`, `${clean}Chronicles`, `Mastery in ${clean}`, `${clean}Ventures`
    ];
  }

  return [
    `The ${clean} Show`, `${clean} Hub`, `${clean} Central`, `Simply ${clean}`,
    `Pure ${clean}`, `${clean} Essentials`, `NextGen ${clean}`, `${clean} Forge`,
    `${clean} Unlocked`, `Beyond ${clean}`, `${clean} Matrix`, `Modern ${clean}`
  ];
}

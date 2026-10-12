import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const channelQuery = searchParams.get('channel');

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      configured: false,
      message: 'This tool requires a YouTube Data API key. The API key has not been configured for this deployment. To use this tool, set the YOUTUBE_API_KEY environment variable in your Vercel project settings or .env.local file.'
    }, { status: 200 });
  }

  if (!channelQuery) {
    return NextResponse.json({ error: 'Please provide a channel URL, ID, or username.' }, { status: 400 });
  }

  try {
    // 1. First attempt to find channel ID via search or channels endpoint
    let channelId = channelQuery.trim();
    if (channelId.includes('youtube.com/channel/')) {
      channelId = channelId.split('youtube.com/channel/')[1].split('/')[0].split('?')[0];
    }

    const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;
    const res = await fetch(apiUrl, { next: { revalidate: 3600 } });
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      // If direct ID lookup didn't match, search by handle or forUsername
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(channelQuery)}&key=${apiKey}`;
      const searchRes = await fetch(searchUrl, { next: { revalidate: 3600 } });
      const searchData = await searchRes.json();

      if (searchData.items && searchData.items.length > 0) {
        const foundId = searchData.items[0].snippet.channelId;
        const detailsRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${foundId}&key=${apiKey}`);
        const detailsData = await detailsRes.json();
        return NextResponse.json({
          configured: true,
          channel: detailsData.items?.[0] || null
        });
      }

      return NextResponse.json({ configured: true, channel: null, message: 'Channel not found.' });
    }

    return NextResponse.json({
      configured: true,
      channel: data.items[0]
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to communicate with YouTube API.' }, { status: 500 });
  }
}

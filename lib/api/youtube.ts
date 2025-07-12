export interface Videos {
  title: string;
  url: string;
  thumbnail: string;
  channel: string;
}

export const searchYouTube = async (query: string): Promise<Videos[]> => {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    if (!API_KEY) return [];

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query + ' tutorial course'
      )}&type=video&maxResults=3&key=${API_KEY}`
    );

    if (!response.ok) return [];

    const data = await response.json();

    return (data.items || []).map((item: any): Videos => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnail: item.snippet.thumbnails.default.url,
      channel: item.snippet.channelTitle
    }));
  } catch (error) {
    console.error('YouTube API error:', error);
    return [];
  }
};

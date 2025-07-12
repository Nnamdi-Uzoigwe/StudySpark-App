export interface WikipediaArticle {
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
}

export const searchWikipedia = async (query: string): Promise<WikipediaArticle[]> => {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/search?q=${encodeURIComponent(query)}&limit=3`
    );

    if (!response.ok) return [];

    const data = await response.json();

    return (data.pages || []).map((page: any): WikipediaArticle => ({
      title: page.title,
      description: page.description,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.key)}`,
      thumbnail: page.thumbnail?.source
    }));
  } catch (error) {
    console.error('Wikipedia API error:', error);
    return [];
  }
};

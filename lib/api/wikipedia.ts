export interface WikipediaArticle {
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
}

export const searchWikipedia = async (query: string, limit: number = 4): Promise<WikipediaArticle[]> => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=${limit}&utf8=&format=json&origin=*`
      );
  
      if (!response.ok) return [];
  
      const data = await response.json();
  
      return (data.query.search || []).map((item: any): WikipediaArticle => ({
        title: item.title,
        description: item.snippet.replace(/<[^>]+>/g, ''),
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`
      }));
    } catch (error) {
      console.error('Wikipedia API error:', error);
      return [];
    }
  };
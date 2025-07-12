export interface Book {
  title: string;
  authors: string;
  thumbnail?: string;
  previewLink?: string;
  infoLink?: string;
  url: String;
}

interface GoogleBookItem {
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
    previewLink?: string;
    infoLink?: string;
  };
}

export const searchBooks = async (query: string): Promise<Book[]> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=3&printType=books`
    );

    if (!response.ok) return [];

    const data = await response.json();

    return (data.items || []).map((item: GoogleBookItem): Book => ({
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors?.join(', ') || 'Unknown Author',
      thumbnail: item.volumeInfo.imageLinks?.thumbnail,
      previewLink: item.volumeInfo.previewLink,
      infoLink: item.volumeInfo.infoLink,
      url: item.volumeInfo.infoLink || '', 
    }));
  } catch (error) {
    console.error('Books API error:', error);
    return [];
  }
};

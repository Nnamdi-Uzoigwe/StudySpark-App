export interface Book {
  title: string
  authors: string
  thumbnail?: string
  previewLink: string
  infoLink: string
}

export interface Videos {
  title: string
  url: string
  thumbnail: string
  channel: string
}

export interface Article {
  title: string
  url: string
  summary?: string
}


export interface YouTubeAPIItem {
  id: { videoId: string }
  snippet: {
    title: string
    thumbnails: {
      default: { url: string }
    }
    channelTitle: string
  }
}

export interface WikipediaArticle {
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
}


export interface WikipediaAPIPage {
  title: string;
  key: string;
  description?: string;
  thumbnail?: {
    source: string;
  };
}
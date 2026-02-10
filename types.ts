
export type Page = 'home' | 'fav' | 'profile' | 'subscription' | 'ai-assistant' | 'news' | 'search' | 'editor' | 'about' | 'privacy' | 'login' | 'player';

export interface Movie {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  year: number;
  rating: string;
  description?: string;
  trending?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

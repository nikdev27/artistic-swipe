export type Direction = 'down' | 'up' | 'left' | 'right';

export interface ImageResult {
  related_content_id: string;
  thumbnail: string;
  title: string;
  original: string;
  source: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'system' | 'user' | 'assistant';
}

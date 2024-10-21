import { ImageResult } from '@/utils/types';

export const fetchImages = async (query: string): Promise<ImageResult[]> => {
  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
    const json = await response.json();
    return json.images;
  } catch (error) {
    throw error;
  }
};

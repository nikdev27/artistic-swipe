import { getJson } from 'serpapi';
import { NextResponse } from 'next/server';

const SERP_API_KEY = process.env.NEXT_PUBLIC_SERP_API_KEY;

export async function POST(req: Request) {
  const { query } = await req.json();

  if (!query) {
    throw new Error('No query found.');
  }

  try {
    const response = await getJson({
      engine: 'google_images',
      api_key: SERP_API_KEY,
      q: query,
    });

    return NextResponse.json({ images: response.images_results });
  } catch (error) {
    throw error;
  }
}

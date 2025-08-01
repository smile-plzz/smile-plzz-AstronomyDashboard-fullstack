import { NextResponse } from 'next/server';

/**
 * Handles GET requests to the nasa-search API endpoint.
 * Searches the NASA Image and Video Library based on a query and media type.
 * @param {Request} request The incoming request object, containing 'q' (query) and 'media_type' search parameters.
 * @returns {NextResponse} The search results data or an error message.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const media_type = searchParams.get('media_type');

  const NASA_API_KEY = process.env.NASA_API_KEY;
  console.log('NASA_API_KEY (from env):', NASA_API_KEY ? 'Set' : 'Not Set');

  const NASA_SEARCH_API_URL = `https://images-api.nasa.gov/search?q=${q}&media_type=${media_type}`;

  try {
    const response = await fetch(NASA_SEARCH_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

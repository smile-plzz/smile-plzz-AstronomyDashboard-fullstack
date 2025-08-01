import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const media_type = searchParams.get('media_type');

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

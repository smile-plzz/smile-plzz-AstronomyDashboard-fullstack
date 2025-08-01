import { NextResponse } from 'next/server';

export async function GET() {
  const NASA_API_KEY = process.env.NASA_API_KEY;
  const MARS_ROVER_API_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${NASA_API_KEY}`;

  try {
    const response = await fetch(MARS_ROVER_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data.latest_photos);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

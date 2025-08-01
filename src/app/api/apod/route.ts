import { NextResponse } from 'next/server';

export async function GET() {
  const NASA_API_KEY = process.env.NASA_API_KEY;
  const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

  console.log('APOD_URL:', APOD_URL);
  console.log('NASA_API_KEY (from env):', NASA_API_KEY ? 'Set' : 'Not Set');

  try {
    const response = await fetch(APOD_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

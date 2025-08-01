import { NextResponse } from 'next/server';

/**
 * Handles GET requests to the mars-rover-photos API endpoint.
 * Fetches the latest photos from the Curiosity Mars Rover from NASA's API.
 * @returns {NextResponse} The latest Mars Rover photos data or an error message.
 */
export async function GET() {
  const NASA_API_KEY = process.env.NASA_API_KEY;
  console.log('NASA_API_KEY (from env):', NASA_API_KEY ? 'Set' : 'Not Set');

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

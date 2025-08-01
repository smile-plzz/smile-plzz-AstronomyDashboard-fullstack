import { NextResponse } from 'next/server';

/**
 * Handles GET requests to the epic-images API endpoint.
 * Fetches Earth Polychromatic Imaging Camera (EPIC) images from NASA's API for a specific date.
 * @param {Request} request The incoming request object, containing the 'date' search parameter (YYYY-MM-DD).
 * @returns {NextResponse} The EPIC image data (including a generated imageUrl) or null if no image is found, or an error message.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date'); // YYYY-MM-DD

  const NASA_API_KEY = process.env.NASA_API_KEY;
  console.log('NASA_API_KEY (from env):', NASA_API_KEY ? 'Set' : 'Not Set');

  const EPIC_API_URL = `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${NASA_API_KEY}`;

  try {
    const response = await fetch(EPIC_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data && data.length > 0) {
      const latestImage = data[0];
      const imageDate = new Date(latestImage.date);
      const formattedImageDate = `${imageDate.getFullYear()}/${(imageDate.getMonth() + 1).toString().padStart(2, '0')}/${imageDate.getDate().toString().padStart(2, '0')}`;
      const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${formattedImageDate}/png/${latestImage.image}.png?api_key=${NASA_API_KEY}`;
      return NextResponse.json({ ...latestImage, imageUrl });
    } else {
      return NextResponse.json(null);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

/**
 * Handles GET requests to the neo-data API endpoint.
 * Fetches Near Earth Objects (NEOs) data from NASA's NeoWs (Near Earth Object Web Service) API.
 * Filters for potentially hazardous asteroids within a specified date range.
 * @param {Request} request The incoming request object, containing 'startDate' and 'endDate' search parameters.
 * @returns {NextResponse} A JSON array of hazardous NEOs or an error message.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const NASA_API_KEY = process.env.NASA_API_KEY;
  console.log('NASA_API_KEY (from env):', NASA_API_KEY ? 'Set' : 'Not Set');

  const NEO_API_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;

  try {
    const response = await fetch(NEO_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    let hazardousNeos: any[] = [];
    if (data.near_earth_objects) {
      for (const date in data.near_earth_objects) {
        data.near_earth_objects[date].forEach((neo: any) => {
          if (neo.is_potentially_hazardous_asteroid) {
            hazardousNeos.push(neo);
          }
        });
      }
    }
    return NextResponse.json(hazardousNeos);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

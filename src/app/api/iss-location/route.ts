import { NextResponse } from 'next/server';

export async function GET() {
  const ISS_URL = 'http://api.open-notify.org/iss-now.json';

  try {
    const response = await fetch(ISS_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

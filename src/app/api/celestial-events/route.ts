import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const NASA_API_KEY = process.env.NASA_API_KEY;
  console.log('NASA_API_KEY (from env):', NASA_API_KEY ? 'Set' : 'Not Set');

  const DONKI_API_URL_FLR = `https://api.nasa.gov/DONKI/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;
  const DONKI_API_URL_CME = `https://api.nasa.gov/DONKI/CMEAnalysis?startDate=${startDate}&endDate=${endDate}&mostAccurateOnly=true&speed=500&halfAngle=30&catalog=ALL&api_key=${NASA_API_KEY}`;

  try {
    const [flrResponse, cmeResponse] = await Promise.all([
      fetch(DONKI_API_URL_FLR),
      fetch(DONKI_API_URL_CME)
    ]);

    const flrData = await flrResponse.json();
    const cmeData = await cmeResponse.json();

    let allEvents: any[] = [];

    flrData.forEach((event: any) => {
      allEvents.push({
        name: `Solar Flare (FLR) - Class ${event.classType}`,
        date: event.beginTime,
        link: event.link
      });
    });

    cmeData.forEach((event: any) => {
      allEvents.push({
        name: `Coronal Mass Ejection (CME) - ${event.type}`,
        date: event.time,
        link: event.link
      });
    });

    allEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json(allEvents);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
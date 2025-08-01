'use client';

import { useState, useEffect } from 'react';

interface IssPosition {
    latitude: string;
    longitude: string;
}

/**
 * IssLocation component fetches and displays the current latitude and longitude
 * of the International Space Station (ISS). The data is updated every 5 seconds.
 */
export default function IssLocation() {
    const [issPosition, setIssPosition] = useState<IssPosition | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const ISS_URL = '/api/iss-location';
    const CACHE_NAME = 'astronomy-dashboard-cache-v1';

    useEffect(() => {
        async function fetchIssLocation() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(ISS_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setIssPosition(data.iss_position);

                // Cache ISS data
                const cache = await caches.open(CACHE_NAME);
                await cache.put(ISS_URL, new Response(JSON.stringify(data)));

            } catch (err: any) {
                console.error('Error fetching ISS location:', err);
                setError(`Failed to load ISS location: ${err.message}. Trying cache...`);

                // Try to load from cache if offline
                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match(ISS_URL);
                if (cachedResponse) {
                    const data = await cachedResponse.json();
                    setIssPosition(data.iss_position);
                    setError(`(Offline) Loaded from cache. Some features may be limited.`);
                } else {
                    setError(`Failed to load ISS location: ${err.message}. No cached data available.`);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchIssLocation();
        const intervalId = setInterval(fetchIssLocation, 5000); // Update every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    return (
        <section id="iss-location">
            <h2>International Space Station (ISS) Location</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {issPosition && (
                <>
                    <p>Latitude: <span>{issPosition.latitude}</span></p>
                    <p>Longitude: <span>{issPosition.longitude}</span></p>
                </>
            )}
        </section>
    );
}

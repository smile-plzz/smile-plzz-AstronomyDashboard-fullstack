'use client';

import { useState, useEffect } from 'react';

interface ApodData {
    title: string;
    hdurl?: string;
    url: string;
    explanation: string;
    copyright?: string;
    date: string;
}

export default function Apod() {
    const [apodData, setApodData] = useState<ApodData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const APOD_URL = '/api/apod';
    const CACHE_NAME = 'astronomy-dashboard-cache-v1';

    useEffect(() => {
        async function fetchApod() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(APOD_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: ApodData = await response.json();
                setApodData(data);

                // Cache APOD data
                const cache = await caches.open(CACHE_NAME);
                await cache.put(APOD_URL, new Response(JSON.stringify(data)));

            } catch (err: any) {
                console.error('Error fetching APOD:', err);
                setError(`Failed to load APOD: ${err.message}. Trying cache...`);

                // Try to load from cache if offline
                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match(APOD_URL);
                if (cachedResponse) {
                    const data: ApodData = await cachedResponse.json();
                    setApodData(data);
                    setError(`(Offline) Loaded from cache. Some features may be limited.`);
                } else {
                    setError(`Failed to load APOD: ${err.message}. No cached data available.`);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchApod();
    }, []);

    const handleAddToFavorites = () => {
        if (!apodData) return;
        let favorites = JSON.parse(localStorage.getItem('apodFavorites') || '[]');
        const newFavorite = { title: apodData.title, url: apodData.url, date: apodData.date };
        if (!favorites.some((fav: any) => fav.date === newFavorite.date)) {
            favorites.push(newFavorite);
            localStorage.setItem('apodFavorites', JSON.stringify(favorites));
            alert('Added to favorites!');
            // In a real app, you'd trigger a re-render of the favorites list here
        } else {
            alert('This image is already in your favorites.');
        }
    };

    const handleShareApod = async () => {
        if (!apodData) return;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: apodData.title,
                    url: apodData.url,
                });
                console.log('APOD shared successfully');
            } catch (error) {
                console.error('Error sharing APOD:', error);
            }
        } else {
            navigator.clipboard.writeText(apodData.url).then(() => {
                alert('APOD URL copied to clipboard!');
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        }
    };

    return (
        <section id="apod">
            <h2>Astronomy Picture of the Day</h2>
            {loading && <p>Loading Astronomy Picture of the Day...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {apodData && (
                <>
                    <h3>{apodData.title}</h3>
                    <img src={apodData.hdurl || apodData.url} alt={apodData.title} />
                    <p>{apodData.explanation}</p>
                    {apodData.copyright && <p>Image Credit: {apodData.copyright}</p>}
                    <button onClick={handleAddToFavorites}>Add to Favorites</button>
                    <button onClick={handleShareApod}>Share APOD</button>
                </>
            )}
        </section>
    );
}

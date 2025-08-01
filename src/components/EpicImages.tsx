'use client';

import { useState, useEffect } from 'react';

interface EpicImage {
    caption: string;
    date: string;
    image: string;
    imageUrl?: string; // Add imageUrl to the interface
}

/**
 * EpicImages component fetches and displays the Earth Polychromatic Imaging Camera (EPIC) image of the day.
 */
export default function EpicImages() {
    const [epicImage, setEpicImage] = useState<EpicImage | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEpicImages() {
            setLoading(true);
            setError(null);
            try {
                const today = new Date();
                const year = today.getFullYear();
                const month = (today.getMonth() + 1).toString().padStart(2, '0');
                const day = today.getDate().toString().padStart(2, '0');

                const EPIC_API_URL = `/api/epic-images?date=${year}-${month}-${day}`;

                const response = await fetch(EPIC_API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                if (data) {
                    setEpicImage(data);
                } else {
                    setEpicImage(null);
                }

            } catch (err: any) {
                console.error('Error fetching EPIC images:', err);
                setError(`Failed to load EPIC images: ${err.message}.`);
            } finally {
                setLoading(false);
            }
        }
        fetchEpicImages();
    }, []);

    return (
        <section id="epic-images">
            <h2>Earth Polychromatic Imaging Camera (EPIC) Images</h2>
            {loading && <p>Loading EPIC images...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !epicImage && !error && <p>No EPIC images available for today.</p>}
            {!loading && epicImage && (
                <div id="epicImageContainer">
                    <img src={epicImage.imageUrl} alt={epicImage.caption} style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '1.5rem auto', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)' }} />
                    <p>{epicImage.caption}</p>
                    <p>Date: {epicImage.date}</p>
                </div>
            )}
        </section>
    );
}
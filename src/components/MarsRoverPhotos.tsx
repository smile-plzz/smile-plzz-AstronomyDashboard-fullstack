'use client';

import { useState, useEffect } from 'react';

interface RoverPhoto {
    img_src: string;
    earth_date: string;
    camera: {
        full_name: string;
    };
}

export default function MarsRoverPhotos() {
    const [roverPhotos, setRoverPhotos] = useState<RoverPhoto[]>([]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const MARS_ROVER_API_URL = '/api/mars-rover-photos';

    useEffect(() => {
        async function fetchMarsRoverPhotos() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(MARS_ROVER_API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data && Array.isArray(data.latest_photos)) {
                    setRoverPhotos(data.latest_photos);
                } else {
                    console.error('API returned non-array data for Mars Rover photos:', data);
                    setRoverPhotos([]);
                }
            } catch (err: any) {
                console.error('Error fetching Mars Rover photos:', err);
                setError(`Failed to load Mars Rover photos: ${err.message}.`);
            } finally {
                setLoading(false);
            }
        }
        fetchMarsRoverPhotos();
    }, []);

    const handlePrevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) =>
            (prevIndex - 1 + roverPhotos.length) % roverPhotos.length
        );
    };

    const handleNextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) =>
            (prevIndex + 1) % roverPhotos.length
        );
    };

    return (
        <section id="mars-rover-photos">
            <h2>Mars Rover Photos</h2>
            {loading && <p>Loading Mars Rover photos...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && roverPhotos.length === 0 && !error && <p>No Mars Rover photos available.</p>}
            {!loading && roverPhotos.length > 0 && (
                <div id="roverPhotosContainer">
                    <div id="currentRoverPhoto">
                        <img id="roverImage" src={roverPhotos[currentPhotoIndex].img_src} alt={`Mars Rover Photo - ${roverPhotos[currentPhotoIndex].earth_date}`} />
                        <p id="roverPhotoDetails">
                            Earth Date: {roverPhotos[currentPhotoIndex].earth_date} | Camera: {roverPhotos[currentPhotoIndex].camera.full_name}
                        </p>
                    </div>
                    <div className="rover-navigation">
                        <button id="prevRoverPhoto" onClick={handlePrevPhoto}>Previous</button>
                        <button id="nextRoverPhoto" onClick={handleNextPhoto}>Next</button>
                    </div>
                </div>
            )}
        </section>
    );
}

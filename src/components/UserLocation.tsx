'use client';

import { useState, useEffect } from 'react';

export default function UserLocation() {
    const [userLat, setUserLat] = useState<string>('N/A');
    const [userLon, setUserLon] = useState<string>('N/A');
    const [locationStatus, setLocationStatus] = useState<string>('');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLat(position.coords.latitude.toFixed(2));
                    setUserLon(position.coords.longitude.toFixed(2));
                    setLocationStatus('Location retrieved successfully.');
                    // Update manual location inputs with geo-located values
                    localStorage.setItem('manualLat', position.coords.latitude.toFixed(2));
                    localStorage.setItem('manualLon', position.coords.longitude.toFixed(2));
                },
                (error) => {
                    setLocationStatus(`Error getting location: ${error.message}`);
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            setLocationStatus('Geolocation is not supported by your browser.');
        }

        // Load manual location if available
        const savedLat = localStorage.getItem('manualLat');
        const savedLon = localStorage.getItem('manualLon');
        if (savedLat && savedLon) {
            setUserLat(parseFloat(savedLat).toFixed(2));
            setUserLon(parseFloat(savedLon).toFixed(2));
            setLocationStatus('Using saved manual location.');
        }
    }, []);

    return (
        <section id="user-location">
            <h2>Your Location</h2>
            <p>Latitude: <span>{userLat}</span></p>
            <p>Longitude: <span>{userLon}</span></p>
            <p id="locationStatus">{locationStatus}</p>
        </section>
    );
}

'use client';

import { useState, useEffect } from 'react';

/**
 * ManualLocation component provides an interface for users to manually input and save
 * their latitude and longitude. This can be used for features that require a specific location.
 */
export default function ManualLocation() {
    const [manualLat, setManualLat] = useState<string>('');
    const [manualLon, setManualLon] = useState<string>('');
    const [manualLocationStatus, setManualLocationStatus] = useState<string>('');

    useEffect(() => {
        const savedLat = localStorage.getItem('manualLat');
        const savedLon = localStorage.getItem('manualLon');
        if (savedLat) setManualLat(savedLat || '');
        if (savedLon) setManualLon(savedLon || '');
    }, []);

    const handleSaveLocation = () => {
        if (manualLat && manualLon) {
            localStorage.setItem('manualLat', manualLat);
            localStorage.setItem('manualLon', manualLon);
            setManualLocationStatus('Manual location saved!');
            // You might want to trigger a re-render of UserLocation or StarChart here
        } else {
            setManualLocationStatus('Please enter both latitude and longitude.');
        }
    };

    return (
        <section id="manual-location">
            <h2>Manual Location Input</h2>
            <label htmlFor="manualLat">Latitude:</label>
            <input
                type="number"
                id="manualLat"
                placeholder="e.g., 34.05"
                step="0.01"
                value={manualLat}
                onChange={(e) => setManualLat(e.target.value)}
            />
            <label htmlFor="manualLon">Longitude:</label>
            <input
                type="number"
                id="manualLon"
                placeholder="e.g., -118.25"
                step="0.01"
                value={manualLon}
                onChange={(e) => setManualLon(e.target.value)}
            />
            <button onClick={handleSaveLocation}>Save Location</button>
            <p id="manualLocationStatus">{manualLocationStatus}</p>
        </section>
    );
}

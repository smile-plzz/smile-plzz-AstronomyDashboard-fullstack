'use client';

import { useEffect, useState } from 'react';

declare const Celestial: any; // Declare Celestial to avoid TypeScript errors

export default function StarChart() {
    const [userLat, setUserLat] = useState<number | null>(null);
    const [userLon, setUserLon] = useState<number | null>(null);
    const [locationStatus, setLocationStatus] = useState<string>('');
    const [celestialLoaded, setCelestialLoaded] = useState<boolean>(false);

    useEffect(() => {
        // Load manual location if available
        const savedLat = localStorage.getItem('manualLat');
        const savedLon = localStorage.getItem('manualLon');
        if (savedLat && savedLon) {
            setUserLat(parseFloat(savedLat));
            setUserLon(parseFloat(savedLon));
            setLocationStatus('Using saved manual location.');
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLat(position.coords.latitude);
                    setUserLon(position.coords.longitude);
                    setLocationStatus('Location retrieved successfully.');
                },
                (error) => {
                    setLocationStatus(`Error getting location: ${error.message}`);
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            setLocationStatus('Geolocation is not supported by your browser.');
        }
    }, []);

    useEffect(() => {
        // Dynamically load d3 and d3-celestial
        const loadScripts = async () => {
            try {
                await import('d3');
                await import('d3-celestial');
                setCelestialLoaded(true);
            } catch (error) {
                console.error('Failed to load d3 or d3-celestial:', error);
            }
        };
        loadScripts();
    }, []);

    useEffect(() => {
        if (userLat !== null && userLon !== null && celestialLoaded) {
            updateStarChart();
        }
    }, [userLat, userLon, celestialLoaded]);

    const updateStarChart = () => {
        if (userLat === null || userLon === null || !celestialLoaded) {
            return;
        }

        // Clear previous chart
        const starChartDisplay = document.getElementById('star-chart-display');
        if (starChartDisplay) {
            starChartDisplay.innerHTML = '';
        }

        // Initialize and display star chart using d3-celestial
        Celestial.display({
            container: "star-chart-display",
            projection: "aitoff",
            center: [userLon, userLat],
            zoomlevel: 1,
            datapath: "/data/",
            stars: {
                colors: true,
                names: true,
                limit: 6,
                style: { fill: "#ddf", opacity: 1 }
            },
            dsos: { show: true, names: true, limit: 6, style: { fill: "#ddf", opacity: 1 } },
            constellations: {
                show: true,
                names: true,
                fromstarnames: true,
                lines: true,
                bounds: false,
                style: { stroke: "#ccc", opacity: 0.6, width: 2 }
            },
            mw: { show: true, style: { fill: "#fff", opacity: 0.2 } },
            planets: { show: true, names: true },
            lines: {
                graticule: { show: true, stroke: "#ccc", width: 0.6, opacity: 0.8 },
                equatorial: { show: true, stroke: "#aaa", width: 1.3, opacity: 0.7 },
                ecliptic: { show: true, stroke: "#66c", width: 1.3, opacity: 0.7 },
                galactic: { show: false },
                meridian: { show: true, stroke: "#aaa", width: 1.3, opacity: 0.7 },
                zenith: { show: true, stroke: "#aaa", width: 1.3, opacity: 0.7 }
            },
            horizon: { show: true, fill: "#000000", opacity: 0.5 },
            form: false, // Hide the default form controls
            location: true // Use current location
        });
    };

    return (
        <section id="star-chart">
            <h2>Interactive Star Chart</h2>
            <div id="star-chart-display" style={{ width: '100%', height: '500px', backgroundColor: '#000', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', borderRadius: '8px', marginTop: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                {(!celestialLoaded || userLat === null || userLon === null) && <p>Loading star chart or waiting for location...</p>}
            </div>
            <div id="star-chart-controls">
                <button id="refreshStarChart" onClick={updateStarChart}>Refresh Star Chart</button>
            </div>
        </section>
    );
}
'use client';

import { useState, useEffect } from 'react';

interface Neo {
    name: string;
    nasa_jpl_url: string;
    is_potentially_hazardous_asteroid: boolean;
    close_approach_data: Array<{
        miss_distance: {
            kilometers: string;
        };
        relative_velocity: {
            kilometers_per_second: string;
        };
        close_approach_date: string;
    }>;
    estimated_diameter: {
        kilometers: {
            estimated_diameter_min: number;
            estimated_diameter_max: number;
        };
    };
}

/**
 * NeoData component fetches and displays information about Near Earth Objects (NEOs).
 * It shows potentially hazardous NEOs from the last 7 days.
 */
export default function NeoData() {
    const [neos, setNeos] = useState<Neo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchNeoData() {
            setLoading(true);
            setError(null);
            try {
                const today = new Date();
                const endDate = today.toISOString().split('T')[0];
                const startDate = new Date(today);
                startDate.setDate(today.getDate() - 7); // Get NEOs for the last 7 days
                const formattedStartDate = startDate.toISOString().split('T')[0];

                const NEO_API_URL = `/api/neo-data?startDate=${formattedStartDate}&endDate=${endDate}`;

                const response = await fetch(NEO_API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setNeos(data);
                } else {
                    console.error('API returned non-array data for NEOs:', data);
                    setNeos([]);
                }

            } catch (err: any) {
                console.error('Error fetching NEO data:', err);
                setError(`Failed to load NEO data: ${err.message}.`);
            } finally {
                setLoading(false);
            }
        }
        fetchNeoData();
    }, []);

    return (
        <section id="neo-data">
            <h2>Near Earth Objects (NEOs)</h2>
            {loading && <p>Loading Near Earth Object data...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && neos.length === 0 && !error && <p>No potentially hazardous NEOs detected in the last 7 days.</p>}
            {!loading && neos.length > 0 && (
                <div id="neoList">
                    <h3>Potentially Hazardous NEOs (Last 7 Days):</h3>
                    <ul>
                        {neos.map((neo, index) => (
                            <li key={index}>
                                <strong>{neo.name}</strong><br />
                                Approach Date: {neo.close_approach_data && neo.close_approach_data.length > 0 ? new Date(neo.close_approach_data[0].close_approach_date).toDateString() : 'N/A'}<br />
                                Approach Date: {neo.close_approach_data?.[0]?.close_approach_date ? new Date(neo.close_approach_data[0].close_approach_date).toDateString() : 'N/A'}<br />
                                Miss Distance: {neo.close_approach_data?.[0]?.miss_distance?.kilometers ? parseFloat(neo.close_approach_data[0].miss_distance.kilometers).toFixed(2) : 'N/A'} km<br />
                                Relative Velocity: {neo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second ? parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(2) : 'N/A'} km/s<br />
                                Est. Diameter: {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km<br />
                                <a href={neo.nasa_jpl_url} target="_blank" rel="noopener noreferrer">More Info (JPL)</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}
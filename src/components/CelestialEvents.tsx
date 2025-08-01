'use client';

import { useState, useEffect } from 'react';

interface CelestialEvent {
    name: string;
    date: string;
    link?: string;
}

/**
 * CelestialEvents component fetches and displays a list of celestial events.
 * It shows events from the last 30 days.
 */
export default function CelestialEvents() {
    const [events, setEvents] = useState<CelestialEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCelestialEvents() {
            setLoading(true);
            setError(null);
            try {
                const today = new Date();
                const startDate = new Date();
                startDate.setDate(today.getDate() - 30); // Get events from the last 30 days

                const formattedStartDate = startDate.toISOString().split('T')[0];
                const formattedEndDate = today.toISOString().split('T')[0];

                const API_URL = `/api/celestial-events?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;

                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setEvents(data);
                } else {
                    console.error('API returned non-array data for celestial events:', data);
                    setEvents([]);
                }

            } catch (err: any) {
                console.error('Error fetching celestial events:', err);
                setError(`Failed to load celestial events: ${err.message}.`);
            } finally {
                setLoading(false);
            }
        }
        fetchCelestialEvents();
    }, []);

    return (
        <section id="celestial-events">
            <h2>Upcoming Celestial Events</h2>
            {loading && <p>Loading celestial events...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && events.length === 0 && !error && <p>No celestial events found for the last 30 days.</p>}
            {!loading && events.length > 0 && (
                <ul id="eventsList">
                    {events.map((event, index) => (
                        <li key={index}>
                            <span>{event.name}</span>
                            <span className="event-date">{new Date(event.date).toDateString()}</span>
                            {event.link && <a href={event.link} target="_blank" rel="noopener noreferrer">Details</a>}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
'use client';

import { useState } from 'react';

interface NasaSearchResult {
    nasa_id: string;
    title: string;
    description: string;
    thumbnail?: string;
}

/**
 * NasaImageVideoSearch component allows users to search the NASA Image and Video Library.
 * It displays search results including titles, descriptions, and thumbnails.
 */
export default function NasaImageVideoSearch() {
    const [searchInput, setSearchInput] = useState<string>('');
    const [searchResults, setSearchResults] = useState<NasaSearchResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!searchInput.trim()) return;

        setLoading(true);
        setError(null);
        setSearchResults([]);

        try {
            const response = await fetch(`/api/nasa-search?q=${searchInput}&media_type=image,video`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.collection && data.collection.items) {
                const items: NasaSearchResult[] = data.collection.items.map((item: any) => {
                    const data = item.data[0];
                    const links = item.links ? item.links[0] : null;
                    return {
                        nasa_id: data.nasa_id,
                        title: data.title,
                        description: data.description,
                        thumbnail: links ? links.href : undefined,
                    };
                });
                setSearchResults(items);
            } else {
                setSearchResults([]);
            }

        } catch (err: any) {
            console.error('Error fetching NASA search results:', err);
            setError(`Failed to load search results: ${err.message}.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="nasa-image-video-search">
            <h2>NASA Image and Video Library Search</h2>
            <input
                type="text"
                id="nasaSearchInput"
                placeholder="Search for images or videos..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
            <button id="nasaSearchButton" onClick={handleSearch}>Search</button>

            <div id="nasaSearchResults">
                {loading && <p>Searching...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && searchResults.length === 0 && searchInput.trim() && !error && <p>No results found.</p>}
                {!loading && searchResults.length > 0 && (
                    <div>
                        {searchResults.map((result) => (
                            <div key={result.nasa_id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
                                <h3>{result.title}</h3>
                                {result.thumbnail && <img src={result.thumbnail} alt={result.title} style={{ maxWidth: '100%', height: 'auto' }} />}
                                <p>{result.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

'use client';

import { useState, useEffect } from 'react';

interface Favorite {
    title: string;
    url: string;
    date: string;
}

/**
 * Favorites component displays a list of Astronomy Picture of the Day (APOD) images saved by the user.
 * It allows users to view and delete their favorited APODs.
 */
export default function Favorites() {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    useEffect(() => {
        renderFavorites();
    }, []);

    const renderFavorites = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('apodFavorites') || '[]');
        if (Array.isArray(storedFavorites)) {
            setFavorites(storedFavorites);
        } else {
            setFavorites([]);
        }
    };

    const handleDeleteFavorite = (indexToDelete: number) => {
        let updatedFavorites = [...favorites];
        updatedFavorites.splice(indexToDelete, 1);
        localStorage.setItem('apodFavorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    };

    const toggleFavorites = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <section id="favorites">
            <h2>Your Favorites <button onClick={toggleFavorites}>{isCollapsed ? 'Show/Hide' : 'Hide'}</button></h2>
            <div id="favoritesList" className={isCollapsed ? 'collapsed' : ''}>
                {favorites.length === 0 ? (
                    <p>No favorites saved yet.</p>
                ) : (
                    favorites.map((fav, index) => (
                        <div key={index} className="favorite-item">
                            <img src={fav.url} alt={fav.title} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                            <p>{fav.title} ({fav.date})</p>
                            <button onClick={() => handleDeleteFavorite(index)}>Delete</button>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

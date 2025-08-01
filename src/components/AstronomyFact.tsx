'use client';

import { useState } from 'react';

interface Fact {
    title: string;
    description: string;
}

const astronomyFacts: Fact[] = [
    {
        title: "What is a Light-Year?",
        description: "A light-year is a unit of distance, not time. It is the distance that light travels in one Earth year, which is approximately 9.46 trillion kilometers (5.88 trillion miles)."
    },
    {
        title: "The Sun's Size",
        description: "The Sun accounts for about 99.86% of the total mass of the Solar System. Approximately 1.3 million Earths could fit inside the Sun."
    },
    {
        title: "Neutron Stars",
        description: "Neutron stars are the collapsed cores of massive supergiant stars. They are incredibly dense; a sugar cube-sized amount of neutron star material would weigh about a billion tons."
    },
    {
        title: "The Observable Universe",
        description: "The observable universe is about 93 billion light-years in diameter. This is the portion of the universe that can be observed from Earth at the present time."
    },
    {
        title: "Why is Mars Red?",
        description: "Mars is known as the Red Planet because of iron minerals in the Martian soil oxidize, or rust, causing the surface and atmosphere to look red."
    }
];

/**
 * AstronomyFact component displays a random astronomy fact.
 * Users can click a button to display a new random fact.
 */
export default function AstronomyFact() {
    const [currentFact, setCurrentFact] = useState<Fact>(() => {
        const randomIndex = Math.floor(Math.random() * astronomyFacts.length);
        return astronomyFacts[randomIndex];
    });

    const displayRandomFact = () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * astronomyFacts.length);
        } while (astronomyFacts[newIndex].title === currentFact.title); // Ensure a different fact is displayed
        setCurrentFact(astronomyFacts[newIndex]);
    };

    return (
        <section id="astronomy-fact">
            <h2>Astronomy Fact of the Day</h2>
            <p id="factTitle">{currentFact.title}</p>
            <p id="factDescription">{currentFact.description}</p>
            <button id="newFactButton" onClick={displayRandomFact}>New Fact</button>
        </section>
    );
}

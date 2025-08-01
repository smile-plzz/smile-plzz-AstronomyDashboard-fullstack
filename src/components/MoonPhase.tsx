'use client';

import { useState, useEffect } from 'react';

export default function MoonPhase() {
    const [moonPhaseText, setMoonPhaseText] = useState<string>('');

    useEffect(() => {
        function calculateMoonPhase() {
            const date = new Date();
            let lp = 29.530588;
            let new_moon = new Date(2000, 0, 6, 18, 30, 0); // New moon on Jan 6, 2000, 18:30 UT
            let phase = ((date.getTime() - new_moon.getTime()) / (1000 * 60 * 60 * 24)) % lp;

            let phaseText = '';
            if (phase < 1.84566) phaseText = 'New Moon';
            else if (phase < 5.53699) phaseText = 'Waxing Crescent';
            else if (phase < 9.22831) phaseText = 'First Quarter';
            else if (phase < 12.91963) phaseText = 'Waxing Gibbous';
            else if (phase < 16.61096) phaseText = 'Full Moon';
            else if (phase < 20.30228) phaseText = 'Waning Gibbous';
            else if (phase < 23.99361) phaseText = 'Last Quarter';
            else if (phase < 27.68493) phaseText = 'Waning Crescent';
            else phaseText = 'New Moon';

            setMoonPhaseText(phaseText);
        }

        calculateMoonPhase();
    }, []);

    return (
        <section id="moon-phase">
            <h2>Current Moon Phase</h2>
            <p>{moonPhaseText}</p>
        </section>
    );
}

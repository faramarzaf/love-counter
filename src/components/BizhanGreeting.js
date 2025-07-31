// src/components/BizhanGreeting.js
import React, {useEffect, useState} from 'react';
import {ReactComponent as BizhanSVG} from '../assets/bizhan.svg';

const messages = [
    "Meow-y Birthday, Mom! (Bizhan)❤️🎂",
    "I purr-omise today will be the best day!",
    "Are there any birthday treats for me?",
    "You're my favorite human! Happy Birthday!",
    "Sending you the biggest head boops today!",
    "Wishing you a paw-sitively amazing day!",
];

export default function BizhanGreeting() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    // --- UPDATED TIMING LOGIC ---
    useEffect(() => {
        // This function runs one full cycle: show Bizhan, then hide him after 10 seconds.
        const runCycle = (isFirstRun = false) => {
            // On subsequent runs, update the message. For the first run, use the default message.
            if (!isFirstRun) {
                setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
            }

            // Make Bizhan slide in.
            setIsVisible(true);

            // Set a timer to make him slide out after 10 seconds.
            setTimeout(() => {
                setIsVisible(false);
            }, 10000); // On screen for 10 seconds (10,000ms)
        };

        // 1. Initial appearance: Wait 2 seconds, then run the first cycle.
        const initialTimeout = setTimeout(() => runCycle(true), 2000);

        // 2. Recurring cycle: Every 60 seconds, start a new cycle.
        const mainInterval = setInterval(() => runCycle(false), 60000); // 1 minute

        // 3. Cleanup function to prevent errors.
        return () => {
            clearTimeout(initialTimeout);
            clearInterval(mainInterval);
        };
    }, []); // The empty [] ensures this effect runs only once.

    return (
        <div className={`bizhan-container ${isVisible ? 'bizhan-visible' : 'bizhan-hidden'}`}>
            <div className="speech-bubble">
                {messages[currentMessageIndex]}
            </div>
            <BizhanSVG style={{width: '120px', height: '120px'}}/>
        </div>
    );
}
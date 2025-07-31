// src/components/BizhanGreeting.js
import React, {useState, useEffect} from 'react';
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

    // --- NEW AND FINAL TIMING LOGIC ---
    useEffect(() => {
        // This will hold the main timer for the recurring cycle.
        let mainInterval;

        // 1. Initial Appearance: After 2 seconds, show Bizhan for the first time.
        const initialTimeout = setTimeout(() => {
            setIsVisible(true); // Show Bizhan

            // After he is visible, set another timer to hide him after 10 seconds.
            setTimeout(() => {
                setIsVisible(false);
            }, 10000); // On screen for 10 seconds

            // 2. Start the Recurring Cycle *after* the first appearance is done.
            // This interval will start 20 seconds after the first appearance (10s on + 10s off).
            mainInterval = setInterval(() => {
                // Update to the next message *before* showing him again.
                setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);

                // Make him visible.
                setIsVisible(true);

                // Set a timer to hide him again after 10 seconds.
                setTimeout(() => {
                    setIsVisible(false);
                }, 10000); // On screen for 10 seconds
            }, 20000); // The full cycle (10s on + 10s off) is 20 seconds.

        }, 2000); // Initial 2-second delay

        // 3. Cleanup Function: This is crucial to stop all timers when the component unmounts.
        return () => {
            clearTimeout(initialTimeout);
            clearInterval(mainInterval);
        };
    }, []); // The empty [] dependency array ensures this effect runs only once.

    return (
        <div className={`bizhan-container ${isVisible ? 'bizhan-visible' : 'bizhan-hidden'}`}>
            <div className="speech-bubble">
                {messages[currentMessageIndex]}
            </div>
            <BizhanSVG style={{width: '120px', height: '120px'}}/>
        </div>
    );
}
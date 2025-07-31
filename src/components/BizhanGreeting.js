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

    // --- NEW, SIMPLIFIED, AND CORRECTED TIMING LOGIC ---
    useEffect(() => {
        // This interval will run every 10 seconds to decide if Bizhan
        // should be visible or hidden.
        const interval = setInterval(() => {
            // Use the functional form of setState to get the most up-to-date state.
            setIsVisible(prevIsVisible => {
                // If he was visible, it's time to hide him.
                if (prevIsVisible) {
                    return false;
                }
                // If he was hidden, it's time to show him with a new message.
                else {
                    setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
                    return true;
                }
            });
        }, 10000); // The cycle repeats every 10 seconds.

        // Cleanup function to stop the timer when the component is unmounted.
        return () => clearInterval(interval);
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
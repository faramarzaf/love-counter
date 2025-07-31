// src/components/BizhanGreeting.js
import React, {useEffect, useState} from 'react';
import {ReactComponent as BizhanSVG} from '../assets/bizhan.svg';

// A list of cute messages for Bizhan to say. Feel free to add more!
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

    useEffect(() => {
        // This effect controls the appearance and disappearance cycle.

        // 1. Initial appearance: Wait 2 seconds after the component loads, then slide in.
        const initialTimeout = setTimeout(() => {
            setIsVisible(true);
        }, 2000); // 2 second delay

        // 2. Recurring cycle: Every 60 seconds, make Bizhan reappear with a new message.
        const mainInterval = setInterval(() => {
            // First, slide him out
            setIsVisible(false);

            // After a short pause (1.5 seconds), update the message and slide him back in.
            // This gives a nice "disappear, think, reappear" effect.
            setTimeout(() => {
                // Move to the next message in the list, looping back to the start if we're at the end.
                setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
                setIsVisible(true);
            }, 1500); // 1.5 second delay before reappearing
        }, 60000); // 60 seconds (1 minute)

        // 3. Cleanup: It's crucial to clear timers when the component unmounts
        // to prevent memory leaks.
        return () => {
            clearTimeout(initialTimeout);
            clearInterval(mainInterval);
        };
    }, []); // The empty array [] means this effect runs only once when the component is created.

    return (
        <div className={`bizhan-container ${isVisible ? 'bizhan-visible' : 'bizhan-hidden'}`}>
            <div className="speech-bubble">
                {messages[currentMessageIndex]}
            </div>
            <BizhanSVG style={{width: '100px', height: '100px'}}/>
        </div>
    );
}
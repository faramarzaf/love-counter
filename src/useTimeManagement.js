// src/hooks/useTimeManagement.js
import { useState, useEffect } from 'react';

export function useTimeManagement() {
    const [isNight, setIsNight] = useState(false);
    const [isBirthday, setIsBirthday] = useState(false);
    const [daysTogetherCount, setDaysTogetherCount] = useState(0);

    // Effect for night mode and birthday check
    useEffect(() => {
        const checkTime = () => {
            const now = new Date();
            const hour = now.getHours();
            const month = now.getMonth() + 1;
            const day = now.getDate();
            setIsNight(hour >= 18 || hour < 6);
            setIsBirthday(month === 8 && day === 26);
        };

        checkTime();
        const interval = setInterval(checkTime, 60000);
        return () => clearInterval(interval);
    }, []);

    // Effect for calculating days together
    useEffect(() => {
        const relationshipStartDate = new Date(2025, 2, 28); // March 28, 2025
        const calculateDays = () => {
            const today = new Date();
            const timeDiff = today - relationshipStartDate;
            setDaysTogetherCount(Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
        };
        calculateDays();
        const interval = setInterval(calculateDays, 1000 * 60 * 60 * 24);
        return () => clearInterval(interval);
    }, []);

    return { isNight, isBirthday, daysTogetherCount };
}
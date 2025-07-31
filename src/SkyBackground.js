// src/components/SkyBackground.js
import React, { useState } from 'react';

// This is the exact same SkyBackground component you originally wrote.
// The only change is that it now lives in its own dedicated file.
const SkyBackground = ({ isNight, isBirthday }) => {
    const [skyElements] = useState(() => ({
        stars: [...Array(50)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 80,
            delay: Math.random() * 3,
            duration: 2 + Math.random() * 2
        })),
        nightClouds: [...Array(6)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: 20 + Math.random() * 40,
            delay: Math.random() * 10,
            duration: 15 + Math.random() * 10
        })),
        dayClouds: [...Array(8)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: 10 + Math.random() * 50,
            delay: Math.random() * 8,
            duration: 10 + Math.random() * 8
        })),
        balloons: [...Array(12)].map((_, i) => ({
            id: i,
            left: Math.random() * 90,
            top: 60 + Math.random() * 30,
            delay: Math.random() * 5,
            duration: 8 + Math.random() * 4,
            emoji: ['🎈', '🎈', '🎈', '💖', '🎀'][Math.floor(Math.random() * 5)]
        })),
        confetti: [...Array(30)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 2,
            duration: 3 + Math.random() * 2,
            emoji: ['🎉', '✨', '💖', '🌟', '🎊', '💕'][Math.floor(Math.random() * 6)]
        })),
        cakes: [...Array(8)].map((_, i) => ({
            id: i,
            left: Math.random() * 90,
            top: 20 + Math.random() * 60,
            delay: Math.random() * 6,
            duration: 12 + Math.random() * 6
        }))
    }));

    if (isBirthday) {
        return (
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-purple-200 to-yellow-200" />
                {skyElements.confetti.map((confetti) => (
                    <div
                        key={`confetti-${confetti.id}`}
                        className="absolute text-2xl animate-bounce opacity-80"
                        style={{
                            left: `${confetti.left}%`,
                            top: `${confetti.top}%`,
                            animationDelay: `${confetti.delay}s`,
                            animationDuration: `${confetti.duration}s`
                        }}
                    >
                        {confetti.emoji}
                    </div>
                ))}
                {skyElements.balloons.map((balloon) => (
                    <div
                        key={`balloon-${balloon.id}`}
                        className="absolute text-4xl animate-float-up"
                        style={{
                            left: `${balloon.left}%`,
                            top: `${balloon.top}%`,
                            animationDelay: `${balloon.delay}s`,
                            animationDuration: `${balloon.duration}s`
                        }}
                    >
                        {balloon.emoji}
                    </div>
                ))}
                {skyElements.cakes.map((cake) => (
                    <div
                        key={`cake-${cake.id}`}
                        className="absolute text-3xl animate-float opacity-70"
                        style={{
                            left: `${cake.left}%`,
                            top: `${cake.top}%`,
                            animationDelay: `${cake.delay}s`,
                            animationDuration: `${cake.duration}s`
                        }}
                    >
                        🎂
                    </div>
                ))}
                <div className="absolute top-10 left-10 text-4xl animate-bounce">🎵</div>
                <div className="absolute top-16 right-16 text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>🎶</div>
                <div className="absolute top-32 left-1/3 text-4xl animate-bounce" style={{animationDelay: '1s'}}>🎵</div>
                <div className="absolute top-24 right-1/4 text-3xl animate-bounce" style={{animationDelay: '1.5s'}}>🎶</div>
            </div>
        );
    }

    if (isNight) {
        return (
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-800" />
                {skyElements.stars.map((star) => (
                    <div
                        key={`star-${star.id}`}
                        className="absolute animate-twinkle"
                        style={{
                            left: `${star.left}%`,
                            top: `${star.top}%`,
                            animationDelay: `${star.delay}s`,
                            animationDuration: `${star.duration}s`
                        }}
                    >
                        ⭐
                    </div>
                ))}
                <div className="absolute top-20 right-20 text-6xl animate-glow">🌙</div>
                {skyElements.nightClouds.map((cloud) => (
                    <div
                        key={`night-cloud-${cloud.id}`}
                        className="absolute text-4xl opacity-30 animate-float-slow"
                        style={{
                            left: `${cloud.left}%`,
                            top: `${cloud.top}%`,
                            animationDelay: `${cloud.delay}s`,
                            animationDuration: `${cloud.duration}s`
                        }}
                    >
                        ☁️
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200" />
                <div className="absolute top-16 right-16 text-7xl animate-spin-slow">☀️</div>
                {skyElements.dayClouds.map((cloud) => (
                    <div
                        key={`day-cloud-${cloud.id}`}
                        className="absolute text-5xl animate-float"
                        style={{
                            left: `${cloud.left}%`,
                            top: `${cloud.top}%`,
                            animationDelay: `${cloud.delay}s`,
                            animationDuration: `${cloud.duration}s`
                        }}
                    >
                        ☁️
                    </div>
                ))}
            </div>
        );
    }
};

export default SkyBackground;
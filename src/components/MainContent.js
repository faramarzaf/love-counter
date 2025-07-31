// src/components/MainContent.js
import React, {useEffect, useRef, useState} from 'react';
import {signOut} from '../firebase';
import {useTimeManagement} from '../useTimeManagement';
import {useDatabase, useNotes} from '../useDatabase'; // We will create this next
import Character from '../Character';
import MemoryJar from '../MemoryJar';
import {ReactComponent as FaramarzSVG} from "../assets/faramarz.svg";
import {ReactComponent as SepidehSVG} from "../assets/sepideh.svg";
import birthdaySong from '../assets/birthday-song.mp3';
import dayAmbientSound from '../assets/day-ambient.mp3';
import nightAmbientSound from '../assets/night-ambient.mp3';

// Custom hook for Audio Management
function useAppAudio(isSpecialBirthday, isNight, userHasInteracted) {
    const birthdayAudioRef = useRef(new Audio(birthdaySong));
    const dayAudioRef = useRef(new Audio(dayAmbientSound));
    const nightAudioRef = useRef(new Audio(nightAmbientSound));
    const ambientTimeoutRef = useRef(null);

    // Birthday Song Logic
    useEffect(() => {
        const audio = birthdayAudioRef.current;
        audio.loop = true;
        if (isSpecialBirthday && userHasInteracted) {
            audio.play().catch(error => console.error("Birthday audio failed:", error));
        }
        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [isSpecialBirthday, userHasInteracted]);

    // Ambient Sound Logic
    useEffect(() => {
        const dayAudio = dayAudioRef.current;
        const nightAudio = nightAudioRef.current;
        dayAudio.volume = 0.15;
        nightAudio.volume = 0.1;

        const playNaturalLoop = (audio) => {
            audio.play().catch(error => console.error("Ambient audio failed:", error));
            audio.onended = () => {
                const randomDelay = Math.random() * 5000 + 5000;
                ambientTimeoutRef.current = setTimeout(() => playNaturalLoop(audio), randomDelay);
            };
        };

        const stopAllAmbient = () => {
            dayAudio.pause();
            nightAudio.pause();
            dayAudio.currentTime = 0;
            nightAudio.currentTime = 0;
            if (ambientTimeoutRef.current) clearTimeout(ambientTimeoutRef.current);
        };

        if (!userHasInteracted || isSpecialBirthday) {
            stopAllAmbient();
            return;
        }

        if (isNight) {
            dayAudio.pause();
            playNaturalLoop(nightAudio);
        } else {
            nightAudio.pause();
            playNaturalLoop(dayAudio);
        }

        return stopAllAmbient;
    }, [isNight, isSpecialBirthday, userHasInteracted]);
}


export default function MainContent({user, auth, isNight, isSpecialBirthday, userHasInteracted}) {
    const {daysTogetherCount} = useTimeManagement();
    const {countF, countS, lastLove, handleClickF, handleClickS} = useDatabase(user);
    const {notes, handleAddNote} = useNotes(user);

    const [currentLoveNote, setCurrentLoveNote] = useState(0);
    const [isJarOpen, setIsJarOpen] = useState(false);

    const myEmail = process.env.REACT_APP_MY_EMAIL;
    const herEmail = process.env.REACT_APP_HER_EMAIL;
    const userEmail = user.email.toLowerCase();
    const isAuthorizedUser = userEmail === myEmail || userEmail === herEmail;

    useAppAudio(isSpecialBirthday, isNight, userHasInteracted);

    const loveNotes = isSpecialBirthday ? [
        "🎉 Happy Birthday my beautiful angel! 🎂✨",
        "🎈 Today we celebrate the most amazing person ever born! 💖",
        "🎁 Every day with you is a gift, but today is extra special! 🌟",
        "🎊 You light up my world brighter than birthday candles! 🕯️💕",
        "🎉 Another year of your incredible existence to celebrate! 🥳❤️",
        "🎂 Wishing my love the happiest birthday ever! 🌈💝"
    ] : [
        "Every beat of my heart belongs to you 💓",
        "Thinking of you makes my whole day better ☀️",
        "You make my life brighter than the sun 🌞",
        "I miss you more than the stars miss the sun 🌌",
        "You're the reason I smile for no reason 😊",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLoveNote((prev) => (prev + 1) % loveNotes.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [loveNotes.length]);


    return (
        <>
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
                <div
                    className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
                    <h1 className={`text-2xl sm:text-4xl font-bold text-center sm:text-left ${
                        isSpecialBirthday ? 'text-pink-600' : isNight ? 'text-yellow-200' : 'text-pink-700'
                    }`}>
                        {isSpecialBirthday ? '🎉 Birthday Love Counter 🎂' : 'Love Counter ❤️'}
                    </h1>
                    <button
                        onClick={() => signOut(auth)}
                        className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded shadow-lg text-sm sm:text-base"
                    >
                        Logout
                    </button>
                </div>

                {isSpecialBirthday && (
                    <div
                        className="mb-6 sm:mb-8 text-center p-4 sm:p-6 rounded-2xl backdrop-blur-sm mx-4 w-full max-w-md sm:max-w-2xl bg-gradient-to-r from-pink-400/30 via-purple-400/30 to-yellow-400/30 border border-pink-300/50">
                        <div className="text-2xl sm:text-4xl font-extrabold mb-3 text-pink-700 animate-bounce">
                            🎉 HAPPY BIRTHDAY SEPIDEH! 🎂
                        </div>
                        <div className="text-base sm:text-lg text-purple-700 font-semibold">
                            🌟 Today we celebrate the most amazing person! 💖✨
                        </div>
                        <div className="text-sm sm:text-base text-pink-600 mt-2">
                            🎵 A special song is playing just for you! 🎶
                        </div>
                    </div>
                )}

                <div
                    className={`mb-6 sm:mb-8 text-center p-4 sm:p-6 rounded-2xl backdrop-blur-sm mx-4 w-full max-w-md sm:max-w-lg ${
                        isSpecialBirthday
                            ? 'bg-gradient-to-r from-pink-300/40 via-purple-300/40 to-yellow-300/40 border border-pink-300/50'
                            : isNight
                                ? 'bg-purple-900/30 border border-purple-400/30'
                                : 'bg-white/40 border border-pink-200/50'
                    }`}>
                    <div className={`text-lg sm:text-2xl font-bold mb-2 ${
                        isSpecialBirthday ? 'text-pink-700' : isNight ? 'text-yellow-200' : 'text-pink-700'
                    }`}>
                        💕 Together for 💕
                    </div>
                    <div className={`text-3xl sm:text-4xl font-extrabold mb-1 ${
                        isSpecialBirthday ? 'text-purple-600' : isNight ? 'text-pink-300' : 'text-red-600'
                    }`}>
                        {daysTogetherCount}
                    </div>
                    <div className={`text-base sm:text-lg ${
                        isSpecialBirthday ? 'text-pink-600' : isNight ? 'text-purple-200' : 'text-pink-600'
                    }`}>
                        {daysTogetherCount === 1 ? 'Beautiful Day' : 'Beautiful Days'} 🌹
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-center">
                    <Character
                        name="Faramarz"
                        label="F"
                        count={countF}
                        onClick={handleClickF}
                        SvgComponent={FaramarzSVG}
                        disabled={userEmail !== myEmail}
                    />
                    <Character
                        name="Sepideh"
                        label="S"
                        count={countS}
                        onClick={handleClickS}
                        SvgComponent={SepidehSVG}
                        disabled={userEmail !== herEmail}
                    />
                </div>

                {lastLove && (
                    <div className={`mt-6 sm:mt-8 text-lg sm:text-xl font-semibold animate-pulse text-center px-4 ${
                        isSpecialBirthday ? 'text-purple-600' : isNight ? 'text-pink-300' : 'text-pink-700'
                    }`}>
                        {lastLove}
                    </div>
                )}

                <div className={`mt-8 sm:mt-12 text-xl sm:text-2xl font-bold text-center ${
                    isSpecialBirthday ? 'text-pink-600' : isNight ? 'text-yellow-200' : 'text-gray-800'
                }`}>
                    Total Loves: <span className="text-red-500">{countF + countS} ❤️</span>
                </div>

                <div
                    className={`mt-6 sm:mt-8 max-w-xs sm:max-w-2xl text-center p-4 sm:p-6 rounded-2xl backdrop-blur-sm transition-all duration-1000 mx-4 ${
                        isSpecialBirthday
                            ? 'bg-gradient-to-r from-pink-400/40 via-purple-400/40 to-yellow-400/40 border border-pink-300/50'
                            : isNight
                                ? 'bg-indigo-900/40 border border-indigo-400/30'
                                : 'bg-white/50 border border-blue-200/50'
                    }`}>
                    <div className={`text-base sm:text-lg font-medium mb-3 ${
                        isSpecialBirthday ? 'text-pink-700' : isNight ? 'text-yellow-200' : 'text-pink-700'
                    }`}>
                        {isSpecialBirthday ? '🎂 Birthday Love Note 🎉' : '💌 Daily Love Note 💌'}
                    </div>
                    <div className={`text-base sm:text-xl font-semibold animate-fade-in-out leading-relaxed ${
                        isSpecialBirthday ? 'text-purple-700' : isNight ? 'text-pink-200' : 'text-gray-700'
                    }`}>
                        {loveNotes[currentLoveNote]}
                    </div>
                </div>

                <div className={`mt-4 sm:mt-6 text-xs sm:text-sm ${
                    isSpecialBirthday ? 'text-pink-500' : isNight ? 'text-purple-300' : 'text-blue-600'
                }`}>
                    {isSpecialBirthday ? '🎉 Birthday Mode! 🎂' : isNight ? '🌙 Night Mode' : '☀️ Day Mode'}
                </div>
            </div>

            {isAuthorizedUser && (
                <>
                    <button
                        onClick={() => setIsJarOpen(true)}
                        className="fixed bottom-8 right-8 z-30 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 text-white rounded-full shadow-lg flex items-center justify-center text-3xl transform hover:scale-110 transition-transform"
                    >
                        🏺
                    </button>

                    <MemoryJar
                        isOpen={isJarOpen}
                        onClose={() => setIsJarOpen(false)}
                        notes={notes}
                        onAddNote={handleAddNote}
                        userEmail={userEmail}
                        myEmail={myEmail}
                    />
                </>
            )}
        </>
    );
}
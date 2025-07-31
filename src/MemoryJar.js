// src/MemoryJar.js
import React, { useState, useRef, useEffect } from 'react';

// A small helper function to format the timestamp from Firebase
function formatTimestamp(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const options = {
        year: 'numeric', // <-- ADD THIS LINE
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };

    // Example output: "Mar 15, 2024, 9:32 PM"
    return date.toLocaleString('en-US', options);
}

export default function MemoryJar({ isOpen, onClose, notes, onAddNote, userEmail, myEmail }) {
    const [newNote, setNewNote] = useState('');
    const notesEndRef = useRef(null); // A ref to help us auto-scroll to the bottom

    // This effect runs every time the `notes` array changes
    useEffect(() => {
        // If new notes come in, scroll to the bottom of the list to show the latest one
        if (isOpen) {
            notesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [notes, isOpen]);


    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the form from reloading the page
        if (newNote.trim() === '') return; // Don't submit empty notes

        onAddNote(newNote); // Call the function passed down from App.js
        setNewNote(''); // Clear the input field
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative flex flex-col w-11/12 max-w-lg h-3/4 max-h-[700px] bg-white/80 rounded-2xl shadow-2xl p-4 sm:p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between pb-4 border-b border-gray-400/50">
                    <h2 className="text-2xl font-bold text-pink-700">Our Memory Jar 🏺</h2>
                    <button onClick={onClose} className="text-2xl text-gray-500 hover:text-red-500">×</button>
                </div>

                {/* Note list area */}
                <div className="flex-grow my-4 overflow-y-auto pr-2 space-y-4">
                    {notes.length > 0 ? (
                        notes.map((note) => {
                            // Check if the current user is the sender of the note
                            const isMe = note.sender.toLowerCase() === userEmail;
                            const senderInitial = note.sender.toLowerCase() === myEmail ? 'F' : 'S';
                            const bubbleColor = isMe ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-800';
                            const alignment = isMe ? 'justify-end' : 'justify-start';

                            return (
                                <div key={note.id} className={`flex ${alignment}`}>
                                    <div className="flex items-end max-w-xs sm:max-w-md">
                                        {/* Show initial for the other person */}
                                        {!isMe && (
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center mr-2">
                                                {senderInitial}
                                            </div>
                                        )}

                                        {/* The message bubble */}
                                        <div className={`px-4 py-2 rounded-2xl ${bubbleColor}`}>
                                            <p className="text-base">{note.text}</p>
                                            <p className={`text-xs mt-1 opacity-70 ${isMe ? 'text-right' : 'text-left'}`}>
                                                {formatTimestamp(note.timestamp)}
                                            </p>
                                        </div>

                                        {/* Show initial for yourself */}
                                        {isMe && (
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center ml-2">
                                                {senderInitial}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-500">
                            No memories yet. Add the first one!
                        </p>
                    )}
                    {/* This empty div is the target for our auto-scroll */}
                    <div ref={notesEndRef} />
                </div>

                {/* Input form for new notes */}
                <form onSubmit={handleSubmit} className="pt-4 border-t border-gray-400/50">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Write a sweet memory..."
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-pink-500 rounded-full hover:bg-pink-600 transition-colors disabled:bg-gray-400"
                            disabled={!newNote.trim()}
                        >
                            ✈️
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
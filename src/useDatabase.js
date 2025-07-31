// src/hooks/useDatabase.js
import {useEffect, useState} from 'react';
import {onValue, push, ref, serverTimestamp, set} from 'firebase/database';
import {db} from './firebase';

// Hook for managing love counts AND the last love message
export function useDatabase(user) {
    const [countF, setCountF] = useState(0);
    const [countS, setCountS] = useState(0);
    const [lastLove, setLastLove] = useState(""); // This state remains, but it will be updated by Firebase

    useEffect(() => {
        if (!user) return;

        // Create references to all three pieces of data in Firebase
        const countRefF = ref(db, "countF");
        const countRefS = ref(db, "countS");
        const lastLoveRef = ref(db, "lastLoveMessage"); // NEW: Reference for the message

        // Listen for changes to all three references
        const unsubF = onValue(countRefF, (snapshot) => setCountF(snapshot.val() || 0));
        const unsubS = onValue(countRefS, (snapshot) => setCountS(snapshot.val() || 0));
        const unsubLastLove = onValue(lastLoveRef, (snapshot) => setLastLove(snapshot.val() || "")); // NEW: Listener for the message

        // Cleanup function to stop all listeners when the component unmounts
        return () => {
            unsubF();
            unsubS();
            unsubLastLove(); // NEW: Unsubscribe from the message listener
        };
    }, [user]);

    // The click handlers now write BOTH the count and the message to Firebase
    const handleClickF = () => {
        if (!user) return;
        set(ref(db, "countF"), countF + 1);
        set(ref(db, "lastLoveMessage"), "F sent a Love ❤️"); // CHANGED: Write to Firebase
    };

    const handleClickS = () => {
        if (!user) return;
        set(ref(db, "countS"), countS + 1);
        set(ref(db, "lastLoveMessage"), "S sent a Love ❤️"); // CHANGED: Write to Firebase
    };

    // The hook returns the same values as before, so no other files need to change
    return {countF, countS, lastLove, handleClickF, handleClickS};
}

// Hook specifically for managing notes (this part is unchanged)
export function useNotes(user) {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        if (!user) return;
        const notesRef = ref(db, 'notes');
        const unsubscribe = onValue(notesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const notesList = Object.keys(data).map(key => ({id: key, ...data[key]}));
                notesList.sort((a, b) => a.timestamp - b.timestamp);
                setNotes(notesList);
            } else {
                setNotes([]);
            }
        });

        return () => unsubscribe();
    }, [user]);

    const handleAddNote = (noteText) => {
        if (!user) return;
        const notesListRef = ref(db, 'notes');
        const newNoteRef = push(notesListRef);
        set(newNoteRef, {
            text: noteText,
            sender: user.email,
            timestamp: serverTimestamp(),
        });
    };

    return {notes, handleAddNote};
}
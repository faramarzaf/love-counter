// src/hooks/useAuth.js
import {useEffect, useState} from 'react';
import {auth, onAuthStateChanged} from './firebase';

export function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    return user;
}
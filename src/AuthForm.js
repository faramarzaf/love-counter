// src/AuthForm.js
import { googleProvider, auth, signInWithPopup } from "./firebase";
import { useState } from "react";

// MODIFICATION 1: The component now accepts the `onSignInClick` prop from App.js
export default function AuthForm({ onSignInClick }) {
    const [error, setError] = useState("");

    const handleGoogleSignIn = async () => {
        // MODIFICATION 2: Before trying to sign in, execute the function
        // that was passed down from App.js. This is our "interaction".
        if (onSignInClick) {
            onSignInClick();
        }

        setError("");
        try {
            await signInWithPopup(auth, googleProvider);
            // on success, user is logged in, handled by auth state listener in App.js
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-sm mx-auto p-6 bg-white rounded shadow text-center">
            <h2 className="text-2xl mb-4">Login or Register with Google</h2>

            {error && (
                <div className="mb-4 text-red-600 font-semibold">{error}</div>
            )}

            <button
                onClick={handleGoogleSignIn}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded flex items-center justify-center gap-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 48 48"
                >
                    <path
                        fill="#FFC107"
                        d="M43.6 20.5H42V20H24v8h11.3C34.1 32 29.7 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C33.5 7.7 28.9 6 24 6 12.9 6 4 14.9 4 26s8.9 20 20 20c11.5 0 20-8.3 20-20 0-1.3-.1-2.7-.4-3.5z"
                    />
                    <path
                        fill="#FF3D00"
                        d="M6.3 14.6l6.6 4.9C14 17 18 14 24 14c3.1 0 5.9 1.2 8 3.1l5.7-5.7C33.5 7.7 28.9 6 24 6 16.7 6 10.3 9.6 6.3 14.6z"
                    />
                    <path
                        fill="#4CAF50"
                        d="M24 42c5.4 0 9.9-1.8 13.3-4.9l-6.1-5.1c-2.3 1.7-5.2 2.8-8.4 2.8-4.4 0-8.1-2.9-9.4-6.9l-6.7 5.2C11.2 39.7 17 42 24 42z"
                    />
                    <path
                        fill="#1976D2"
                        d="M43.6 20.5H42V20H24v8h11.3c-1 2.9-3 5.3-5.9 6.9l6.1 5.1c3.7-3.4 6-8.7 6-14.9 0-1.3-.1-2.7-.4-3.5z"
                    />
                </svg>
                Continue with Google
            </button>
        </div>
    );
}
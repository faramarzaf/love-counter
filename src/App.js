// src/App.js
import { useState } from "react";
import AuthForm from "./AuthForm";
import MainContent from "./components/MainContent";
import SkyBackground from "./SkyBackground";
import { useAuth } from "./useAuth";
import { useTimeManagement } from "./useTimeManagement";
import { auth } from './firebase'; // Import auth for signOut

function App() {
    const user = useAuth();
    const { isNight, isBirthday } = useTimeManagement();
    const [userHasInteracted, setUserHasInteracted] = useState(false);

    const myEmail = process.env.REACT_APP_MY_EMAIL;
    const herEmail = process.env.REACT_APP_HER_EMAIL;

    const userEmail = user?.email?.toLowerCase();
    const isSpecialBirthday = isBirthday && (userEmail === myEmail || userEmail === herEmail);

    const handleSignInInteraction = () => {
        setUserHasInteracted(true);
    };

    return (
        <div className="min-h-screen relative">
            <SkyBackground isNight={isNight} isBirthday={isSpecialBirthday} />

            {!user ? (
                <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
                    <AuthForm onSignInClick={handleSignInInteraction} />
                </div>
            ) : (
                <MainContent
                    user={user}
                    auth={auth} // Pass auth down for the logout button
                    isNight={isNight}
                    isSpecialBirthday={isSpecialBirthday}
                    userHasInteracted={userHasInteracted}
                />
            )}
        </div>
    );
}

export default App;
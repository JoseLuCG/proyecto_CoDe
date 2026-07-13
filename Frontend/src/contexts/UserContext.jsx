import { createContext, useEffect, useState } from "react";
import Storage from "../utilities/storagePersistence";

export const User = createContext();

const GUEST_USER = {
    uuidUser: "guest-local",
    nameUser: "Invitado",
    lastName: "",
    email: "",
    phoneNumber: "",
    isGuest: true,
};

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isGuest, setIsGuest] = useState(false);

    async function loadSession() {
        try {
            const storedToken = await Storage.getItem("token");
            const storedUser = await Storage.getItem("user");
            const storedIsGuest = await Storage.getItem("isGuest");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                if (storedIsGuest === "true" || parsedUser.isGuest) {
                    setIsGuest(true);
                }
            }
            if (storedToken) {
                setToken(storedToken);
            }
        } catch (error) {
            console.error("Error loading session:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function saveSession(newToken, newUser) {
        if (newToken && newUser) {
            await Storage.setItem("token", newToken);
            await Storage.setItem("user", JSON.stringify(newUser));
            await Storage.removeItem("isGuest");
            setToken(newToken);
            setUser(newUser);
            setIsGuest(false);
        }
    }

    async function enterGuestMode() {
        await Storage.setItem("user", JSON.stringify(GUEST_USER));
        await Storage.setItem("isGuest", "true");
        setUser(GUEST_USER);
        setIsGuest(true);
    }

    async function logout() {
        await Storage.removeItem("token");
        await Storage.removeItem("user");
        await Storage.removeItem("isGuest");
        setToken(null);
        setUser(null);
        setIsGuest(false);
    }

    useEffect(() => {
        loadSession();
    }, []);

    return(
        <User.Provider value={{ user, token, isLoading, isGuest, setUser: saveSession, enterGuestMode, logout }}>
            {children}
        </User.Provider>
    );
}

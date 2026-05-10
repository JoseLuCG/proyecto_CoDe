import { createContext, useEffect, useState } from "react";
import Storage from "../utilities/storagePersistence";

export const User = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function loadSession() {
        try {
            const storedToken = await Storage.getItem("token");
            const storedUser = await Storage.getItem("user");
            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
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
            setToken(newToken);
            setUser(newUser);
        }
    }

    async function logout() {
        await Storage.removeItem("token");
        await Storage.removeItem("user");
        setToken(null);
        setUser(null);
    }

    useEffect(() => {
        loadSession();
    }, []);

    return(
        <User.Provider value={{ user, token, isLoading, setUser: saveSession, logout }}>
            {children}
        </User.Provider>
    );
}

import { createContext, useEffect, useState } from "react";
import Storage from "../utilities/storagePersistence";

export const User = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    async function loadUser() {
        const storedUser= await Storage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }

    async function saveUser() {
        if(user !== null) {
            await Storage.setItem("user", JSON.stringify(user));
        } else {
            await Storage.removeItem("user");
        }
    }

    useEffect(()=> {
        loadUser();
    }, []);

    useEffect(()=> {
        saveUser();
    }, [user]);

    return(
        <User.Provider value={[user, setUser]}>
            {children}
        </User.Provider>
    );
}
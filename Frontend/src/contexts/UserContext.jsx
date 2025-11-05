import { createContext, useState } from "react";

export const User = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    return(
        <User.Provider value={[user, setUser]}>
            {children}
        </User.Provider>
    );
}
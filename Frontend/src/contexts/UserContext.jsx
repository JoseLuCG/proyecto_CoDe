import { createContext, useState } from "react";

export const User = createContext();

export function UserContext({ children }) {
    const [user, setUser] = useState(null);

    return(
        <User.Provider value={[user, setUser]}>
            {children}
        </User.Provider>
    );
}
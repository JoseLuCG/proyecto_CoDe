import { createContext, useContext, useEffect, useState, useCallback } from "react";
import NetInfo from "@react-native-community/netinfo";
import { getCount } from "../utilities/offlineQueue";
import { syncPendingOperations } from "../utilities/syncEngine";

const NetworkContext = createContext();

export function NetworkProvider({ children }) {
    const [isOnline, setIsOnline] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [pendingCount, setPendingCount] = useState(0);

    const refreshPendingCount = useCallback(async () => {
        const count = await getCount();
        setPendingCount(count);
    }, []);

    const syncNow = useCallback(async () => {
        if (isSyncing) return;
        setIsSyncing(true);
        try {
            await syncPendingOperations();
        } finally {
            await refreshPendingCount();
            setIsSyncing(false);
        }
    }, [isSyncing, refreshPendingCount]);

    useEffect(() => {
        refreshPendingCount();

        const unsubscribe = NetInfo.addEventListener(async state => {
            const online = state.isConnected && state.isInternetReachable !== false;
            const wasOffline = !isOnline;
            setIsOnline(online);

            if (online && wasOffline) {
                const count = await getCount();
                if (count > 0) {
                    syncNow();
                }
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <NetworkContext.Provider value={{ isOnline, isSyncing, pendingCount, refreshPendingCount, syncNow }}>
            {children}
        </NetworkContext.Provider>
    );
}

export function useNetwork() {
    return useContext(NetworkContext);
}

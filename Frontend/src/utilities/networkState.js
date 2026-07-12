import NetInfo from "@react-native-community/netinfo";

let cachedIsOnline = true;

NetInfo.addEventListener(state => {
    cachedIsOnline = state.isConnected && state.isInternetReachable !== false;
});

export async function isOnline() {
    const state = await NetInfo.fetch();
    cachedIsOnline = state.isConnected && state.isInternetReachable !== false;
    return cachedIsOnline;
}

export function getCachedOnlineStatus() {
    return cachedIsOnline;
}

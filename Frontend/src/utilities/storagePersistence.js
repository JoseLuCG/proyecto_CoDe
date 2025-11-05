import { Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {
    async setItem(key, value) {
        try {
            if (Platform.OS === 'web') {
                localStorage.setItem(key, value);
            } else {
                await AsyncStorage.setItem(key, value);
            }
        } catch (error) {
            console.error("Storage setItem error:", error);
        }
    },

    async getItem(key) {
        try {
            if (Platform.OS === 'web') {
                return localStorage.getItem(key);
            } else {
                return await AsyncStorage.getItem(key);
            }
        } catch (error) {
            console.error('Storage getItem error:', error);
            return null;
        }
    },

    async removeItem(key) {
        try {
            if (Platform.OS === 'web') {
                localStorage.removeItem(key);
            } else {
                await AsyncStorage.removeItem(key);
            }
        } catch (error) {
            console.error('Storage removeItem error:', error);
        }
    },
}

export default Storage;
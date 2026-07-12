import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { useNetwork } from "../contexts/NetworkContext";
import { colorStyle } from "../styles/Colors";

export default function NetworkBanner() {
    const { isOnline, isSyncing, pendingCount } = useNetwork();
    const slideAnim = useRef(new Animated.Value(-50)).current;

    const visible = !isOnline || isSyncing;

    useEffect(() => {
        Animated.spring(slideAnim, {
            toValue: visible ? 0 : -50,
            useNativeDriver: true,
            tension: 60,
            friction: 8,
        }).start();
    }, [visible]);

    if (!visible && pendingCount === 0 && isSyncing === false) {
        return null;
    }

    let message = "";
    let bgColor = colorStyle.textInactive;
    if (isSyncing) {
        message = "Syncing data...";
        bgColor = colorStyle.mainGradient[1];
    } else if (!isOnline && pendingCount > 0) {
        message = `Offline \u2014 ${pendingCount} operation${pendingCount !== 1 ? "s" : ""} pending`;
        bgColor = "#b8860b";
    } else if (!isOnline) {
        message = "Offline";
        bgColor = colorStyle.textInactive;
    }

    return (
        <Animated.View style={[styles.banner, { backgroundColor: bgColor, transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    banner: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingVertical: 6,
        paddingHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
    },
    text: {
        color: colorStyle.textPrimary,
        fontSize: 12,
        fontWeight: "600",
    },
});

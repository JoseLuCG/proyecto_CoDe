import { View, StyleSheet, Text, Image, Pressable, Animated, Platform } from "react-native";
import { useRef } from "react";
import { colorStyle } from "../styles/Colors";

function NavigationTab({ labelText, iconSource, isActive, onPress }) {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const activeColor = colorStyle.mainGradient[0];

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.85,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View
                style={[
                    styles.navigationTab,
                    { transform: [{ scale: scaleAnim }] },
                ]}
            >
                <Image
                    source={iconSource}
                    style={[styles.image, isActive && { tintColor: activeColor }]}
                />
                <Text style={[styles.label, isActive && { color: activeColor, fontWeight: '700' }]}>
                    {labelText}
                </Text>
                {isActive && <View style={[styles.activeDot, { backgroundColor: activeColor }]} />}
            </Animated.View>
        </Pressable>
    );
}

export default NavigationTab;

const styles = StyleSheet.create({
    navigationTab: {
        height: 70,
        width: Platform.OS === 'android' ? 68 : 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 26,
        width: 26,
        resizeMode: 'contain',
        tintColor: colorStyle.textInactive,
    },
    label: {
        fontSize: 11,
        color: colorStyle.textInactive,
        marginTop: 4,
    },
    activeDot: {
        width: 5,
        height: 5,
        borderRadius: 3,
        marginTop: 4,
    },
});
import { View, StyleSheet, Text, Image, Pressable, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { colorStyle } from "../styles/Colors";

function NavigationTab({labelText, iconSource, navigateTo, isActive}) {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const activeColor = colorStyle.mainGradient[0];

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

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

    function goTo() {
        navigation.navigate(navigateTo);
    }

    return (
        <Pressable
            onPress={goTo}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View
                style={[
                    styles.navigationTab,
                    { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
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
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 26,
        width: 26,
        resizeMode: 'contain',
        tintColor: '#aaa',
    },
    label: {
        fontSize: 11,
        color: '#aaa',
        marginTop: 4,
    },
    activeDot: {
        width: 5,
        height: 5,
        borderRadius: 3,
        marginTop: 4,
    },
});
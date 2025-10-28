import { View, StyleSheet, Text, Image, Pressable, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { defaultBRadius } from '../styles/DefaultVaules';
import { useEffect, useRef } from "react";

function NavigationTab({labelText, iconSource, navigateTo}) {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(()=> {
        if (iconSource) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start();
        }
    }, [iconSource]);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.75,
            useNativeDriver: true,
        }).start();
    }

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
    return(
        <Pressable
            onPress={goTo}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View style={[styles.navigationTab, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                <Image
                    source={iconSource}
                    style={styles.image}
                />
                <Text>{labelText}</Text>
            </Animated.View>
        </Pressable>
    );
}

export default NavigationTab;

const styles = StyleSheet.create({
    navigationTab: {
        backgroundColor: 'rgba(0, 200, 255, 0.91)',
        height: 70,
        width: 80,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: defaultBRadius,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 40,
        width: 60,
        resizeMode: 'contain',
    }
});
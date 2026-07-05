import { View, StyleSheet, Text, Platform } from "react-native";
import NavigationTab from "./NavigationTab";
import { navigationContentArray } from "../utilities/navitationArrayTab";
import { colorStyle } from "../styles/Colors";

function NavigationBar({ state, descriptors, navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <Text style={styles.brand}>Wake Up</Text>
                <View style={styles.navTabs}>
                    {state.routes.map((route, index) => {
                        const isFocused = state.index === index;
                        const tabInfo = navigationContentArray.find(t => t.navigateTo === route.name);

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });
                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        return (
                            <NavigationTab
                                key={route.key}
                                labelText={tabInfo?.labelText || route.name}
                                iconSource={tabInfo?.iconSource}
                                isActive={isFocused}
                                onPress={onPress}
                            />
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

export default NavigationBar;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        ...Platform.select({
            web: {
                position: 'sticky',
                top: 0,
                zIndex: 100,
            },
        }),
        /*
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 100,
        */
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 24,
        height: 64,
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
    },
    brand: {
        fontSize: 22,
        fontWeight: '700',
        color: colorStyle.mainGradient[0],
        marginRight: 100
    },
    navTabs: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});

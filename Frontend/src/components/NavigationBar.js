import { View, StyleSheet } from "react-native";
import NavigationTab from "./NavigationTab";
import { navigationContentArray } from "../utilities/navitationArrayTab";
import { colorStyle } from "../styles/Colors";

function NavigationBar({ state, descriptors, navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.navigationBar}>
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
    );
}

export default NavigationBar;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    navigationBar: {
        backgroundColor: colorStyle.bgDark,
        height: 135,
        width: 320,
        paddingHorizontal: 24,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
});
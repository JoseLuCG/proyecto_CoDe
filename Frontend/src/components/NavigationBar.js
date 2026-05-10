import { View, StyleSheet } from "react-native";
import { useNavigationState } from "@react-navigation/native";
import NavigationTab from "./NavigationTab";
import { navigationContentArray } from "../utilities/navitationArrayTab";

function NavigationBar() {
    const currentRoute = useNavigationState(state => state.routes[state.index]?.name);

    return (
        <View style={styles.navigationBar}>
            {navigationContentArray.map((tab, index) => (
                <NavigationTab
                    key={index}
                    labelText={tab.labelText}
                    iconSource={tab.iconSource}
                    navigateTo={tab.navigateTo}
                    isActive={currentRoute === tab.navigateTo}
                />
            ))}
        </View>
    );
}

export default NavigationBar;

const styles = StyleSheet.create({
    navigationBar: {
        backgroundColor: '#fff',
        height: 115,
        width: '100%',
        paddingHorizontal: 24,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 0,
        paddingBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
});
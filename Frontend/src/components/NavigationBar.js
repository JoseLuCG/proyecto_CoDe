import { View, StyleSheet, Text } from "react-native";
import { defaultBRadius } from '../styles/DefaultVaules';
import NavigationTab from "./NavigationTab";
import { navigationContentArray } from "../utilities/navitationArrayTab";

function NavigationBar({navigation}) {

    
    return(
        <View style={styles.navigationBar}>
            {
                navigationContentArray.map(
                    (tab, index) => {
                       return <NavigationTab key={index} labelText={tab.labelText} iconSource={tab.iconSource} navigateTo={tab.navigateTo}/>
                    }
                )
            }
        </View>
    );
}

export default NavigationBar;

const styles = StyleSheet.create({
    navigationBar: {
        backgroundColor: 'rgba(255, 255, 255, 0.91)',
        height: 80,
        width: 350,
        borderRadius: defaultBRadius,
        padding: 0,
        marginTop: 10,
		bottom: 40,
		zIndex: 3,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 50,
    }, 
});
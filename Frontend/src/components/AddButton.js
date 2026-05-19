import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colorStyle } from '../styles/Colors';

function AddButton({onOpen}) {
    return (
        <TouchableOpacity style={styles.addButton} onPress={onOpen}>
            <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
    );
}
        
export default AddButton;

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: 155,
        right: 20,
        zIndex: 3,
        backgroundColor: colorStyle.mainGradient[0],
        width: 50,
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    }
});
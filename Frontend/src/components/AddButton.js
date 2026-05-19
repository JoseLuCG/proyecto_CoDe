import { StyleSheet, TouchableOpacity, Text } from 'react-native';

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
        bottom: 20,
        right: 20,
        zIndex: 3,
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold'
    }
});
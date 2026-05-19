import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colorStyle } from '../styles/Colors';

function AddButton({ onOpen }) {
    return (
        <TouchableOpacity style={styles.addButton} onPress={onOpen} activeOpacity={0.8}>
            <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
    );
}

export default AddButton;

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        top: 80,
        right: 24,
        zIndex: 50,
        backgroundColor: colorStyle.mainGradient[0],
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
        cursor: 'pointer',
    },
    buttonText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#fff',
        lineHeight: 24,
    },
});

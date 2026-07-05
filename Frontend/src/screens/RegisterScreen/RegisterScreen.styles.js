import { StyleSheet } from "react-native";
import { defaultBRadius } from '../../styles/DefaultVaules';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    link: {
        color: '#007BFF',
        textDecorationLine: 'underline',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#1DA27A',
        borderRadius: defaultBRadius,
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
        marginVertical: 10,
    },
    buttonPressed: {
        backgroundColor: '#223D35',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 13,
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginTop: -8,
        marginBottom: 4,
    },
    errorGeneral: {
        color: '#FF3B30',
        fontSize: 14,
        backgroundColor: 'rgba(255, 59, 48, 0.1)',
        padding: 12,
        borderRadius: 8,
        width: '90%',
        textAlign: 'center',
        marginBottom: 10,
        alignSelf: 'center',
    },
});
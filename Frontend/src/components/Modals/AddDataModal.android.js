import { View, StyleSheet, Dimensions, Text, Modal, TouchableOpacity } from "react-native";
import AddExerciseDataModal from "./AddExerciseDataModal";
import AddFoodDataModal from "./AddFoodDataModal";
import { colorStyle } from "../../styles/Colors";

const { height } = Dimensions.get('window');

export default function AddDataModal({ isVisible, onClose, date, screen }) {
    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
            <View style={styles.modalContent}>
                <View style={styles.modalHandle} />
                <Text style={styles.modalTitle}>
                    {date ? date.format('DD-MM-YYYY') : 'No date selected'}
                </Text>
                {
                    screen == "Exercises" ?
                        <AddExerciseDataModal date={date} onClose={onClose} />
                        :
                        <AddFoodDataModal date={date} onClose={onClose} />
                }
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: height * 0.85,
        backgroundColor: colorStyle.bgDark,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        alignItems: 'center',
        width: "100%"
    },
    modalHandle: {
        width: 40,
        height: 5,
        backgroundColor: colorStyle.textInactive,
        borderRadius: 2.5,
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 22,
        marginBottom: 10,
        fontFamily: "main-font",
        color: colorStyle.textPrimary,
    },
});

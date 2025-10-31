import { View, StyleSheet, Dimensions, Text } from "react-native";
import Modal from 'react-native-modal';

const { height } = Dimensions.get('window');

export default function AddDataModal({ isVisible, onClose, date, screen }) {
     return(
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onSwipeComplete={onClose}
            swipeDirection="down"
            style={styles.modalContainer}
            backdropTransitionOutTiming={0}
            useNativeDriverForBackdrop
        >
            <View style={styles.modalContent}>
                <View style={styles.modalHandle} />
                <Text style={styles.modalTitle}>
                    {date ? date.format('DD-MM-YYYY') : 'No date selected'}
                </Text>
                {
                    screen == "Exercises"?
                    <View>
                        <Text style={styles.modalTitle}>
                            Pestaña de ejercicios    
                        </Text>
                    </View>
                    :
                    <View>
                        <Text style={styles.modalTitle}>
                            Pestaña de alimentación    
                        </Text>
                    </View>
                }   
            </View>
        </Modal>
     );
}

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        height: height * 0.85,
        backgroundColor: 'rgba(255, 255, 255, 0.91)',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        alignItems: 'center',
    },
    modalHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 2.5,
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 18,
        color: '#666',
    },
});
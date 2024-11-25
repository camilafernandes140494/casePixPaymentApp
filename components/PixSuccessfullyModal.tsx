import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedText } from './ThemedText';


interface ProcessingTransferModalProps {
    isOpen: boolean
}
const PixSuccessfullyModal = ({ isOpen }: ProcessingTransferModalProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(isOpen);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsVisible(false)}
        >
            <View style={styles.modalContainer}>
                <ActivityIndicator size="large" color="#FFFFFF" />
                <ThemedText style={styles.modalText}>
                    Processando
                    sua transferência
                </ThemedText>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#00726D',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16
    },
    modalText: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        maxWidth: 218
    },
});

export default PixSuccessfullyModal;

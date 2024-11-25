import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';



interface ProcessingTransferModalProps {
    isOpen: boolean,
    onClose?: () => void;
    name: string,
    price: string,
    date: string
}
const PixSuccessfullyModal = ({ isOpen, onClose, name, price, date }: ProcessingTransferModalProps) => {
    const [modalVisible, setModalVisible] = useState(isOpen);
    const closeModal = () => { setModalVisible(false), onClose && onClose() };
    useEffect(() => { setModalVisible(isOpen) }, [isOpen])

    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
            animationType="fade"
        >
            <View style={styles.modalOverlay}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={closeModal} style={styles.iconContainer}>
                        <Ionicons name="close-outline" size={24} color="#004D49" />
                    </TouchableOpacity>
                    <ThemedText type="title">Pix realizado com sucesso!</ThemedText>
                </View>
                <View style={styles.iconWrapper}>
                    <Ionicons name="checkmark-circle-outline" size={64} color="#FFFFFF" />
                </View>
                <View style={styles.modalText}>
                    <ThemedText>Para</ThemedText>
                    <ThemedText type='defaultSemiBold'>{name}</ThemedText>
                </View>
                <View style={styles.modalTextRow}>
                    <View style={styles.modalText}>
                        <ThemedText>Valor</ThemedText>
                        <ThemedText type='defaultSemiBold'>{price}</ThemedText>
                    </View>
                    <View style={styles.modalText}>
                        <ThemedText>Data</ThemedText>
                        <ThemedText type='defaultSemiBold'>{date}</ThemedText>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'flex-start',
        gap: 24,
        width: "100%"
    },
    iconWrapper: {
        backgroundColor: "#00726D",
        borderRadius: 50,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    iconContainer: {
        backgroundColor: '#E5FFFE',
        padding: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 24,
        padding: 20,
    },
    modalText: {
        fontSize: 18,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center'
    },
    modalTextRow: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        gap: 16
    },
});

export default PixSuccessfullyModal;

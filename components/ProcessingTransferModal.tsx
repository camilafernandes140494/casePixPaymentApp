import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, Animated } from 'react-native';
import { ThemedText } from './ThemedText';
import { useRotationAnimation } from '@/hooks/useRotationAnimation';

interface ProcessingTransferModalProps {
    isOpen: boolean;
    onClose?: () => void;
}

const ProcessingTransferModal = ({ isOpen, onClose }: ProcessingTransferModalProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(isOpen);
    const { spin, startRotation, stopRotation } = useRotationAnimation();


    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);


    useEffect(() => {
        if (isOpen) {
            startRotation();

            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose?.();
            }, 3000);

            return () => {
                clearTimeout(timer);
                stopRotation();
            };
        } else {
            stopRotation();
        }
    }, [isOpen, startRotation, stopRotation]);

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => {
                setIsVisible(false);
                stopRotation();
            }}
            accessible
            accessibilityLabel="Processando sua transferência"
        >
            <View style={styles.modalContainer}>
                <Animated.Image
                    source={require('@/assets/images/loading.png')}
                    style={[styles.image, { transform: [{ rotate: spin }] }]}
                    resizeMode="contain"
                />
                <ThemedText style={styles.modalText}>
                    Processando sua transferência
                </ThemedText>
            </View>
        </Modal>
    );
};




const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#00726D',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        padding: 20,
    },
    modalText: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        maxWidth: '80%',
    },
    image: {
        width: 80,
        height: 80,
    },
});

export default ProcessingTransferModal;

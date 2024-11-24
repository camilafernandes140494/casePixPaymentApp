import React, { useEffect, useRef, useState } from 'react';
import { Modal, View, StyleSheet, ActivityIndicator, Image, Animated } from 'react-native';
import { ThemedText } from './ThemedText';


interface ProcessingTransferModalProps {
    isOpen: boolean
}
const ProcessingTransferModal = ({ isOpen }: ProcessingTransferModalProps) => {
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

    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Inicia a animação de rotação
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 1000, // Tempo para completar uma rotação (1 segundo)
                // easing: Animated.Easing.linear, // Roda suavemente
                useNativeDriver: true, // Usa a API nativa para melhor desempenho
            })
        ).start();

        // Retorna uma função de limpeza ao desmontar
        return () => rotation.stopAnimation();
    }, [rotation]);

    // Interpola os valores para girar de 0 a 360 graus
    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'], // Rotação completa
    });

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setIsVisible(false)}
        >
            <View style={styles.modalContainer}>

                <Animated.Image
                    source={require('@/assets/images/loading.png')}
                    style={[styles.image, { transform: [{ rotate: spin }] }]}
                    resizeMode="contain"
                />
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
    image: {
        width: 100,
        height: 100,
    },
});

export default ProcessingTransferModal;

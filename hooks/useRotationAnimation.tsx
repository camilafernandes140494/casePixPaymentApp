import { useRef } from 'react';
import { Animated } from 'react-native';


export const useRotationAnimation = () => {
    const rotation = useRef(new Animated.Value(0)).current;

    const startRotation = () => {
        rotation.setValue(0);
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ).start();
    };

    const stopRotation = () => {
        rotation.stopAnimation();
    };

    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return { spin, startRotation, stopRotation };
};
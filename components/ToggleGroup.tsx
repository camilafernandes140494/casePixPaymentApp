import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import VisaLogo from '@/assets/images/visa.png';
import { ThemedText } from './ThemedText';

interface ToggleOption {
    id: number;
    title: string;
    description: string;
}

interface ToggleGroupProps {
    options: ToggleOption[];
    onSelect: (selectedId: number) => void;
    children?: React.ReactNode;
    childrenPosition?: number;
}

const ToggleGroup = ({ options, onSelect, children, childrenPosition }: ToggleGroupProps) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleSelect = (id: number) => {
        setSelectedId(id);
        onSelect(id);
    };

    return (
        <View style={styles.container}>
            {options.map((option, index) => (
                <View key={option.id}>
                    <TouchableOpacity
                        style={[styles.toggleOption]}
                        onPress={() => handleSelect(option.id)}
                    >
                        <ToggleItem key={option.id} title={option.title} description={option.description} checked={selectedId === option.id} />
                    </TouchableOpacity>
                    {children && childrenPosition === index + 1 && (
                        children
                    )}
                </View>
            ))}
        </View>
    );
};


interface ToggleItemProps extends Partial<ToggleOption> {
    checked?: boolean;
}
const ToggleItem = ({ title, description, checked }: ToggleItemProps) => {

    return (
        <View style={styles.containerCard}>
            <Ionicons name={checked ? "radio-button-on-outline" : 'radio-button-off-outline'} size={30} color='#00726D' />
            <View style={styles.containerCardAll}>

                <View style={styles.containerCardBrand}>
                    {title === 'visa' && <Image
                        source={require('@/assets/images/visa.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />}
                    {title === 'mastercard' && <Image
                        source={require('@/assets/images/mastercard.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />}

                    <ThemedText type="defaultSemiBold" color='#00726D'>{`Cartão ${title}`}</ThemedText>
                </View>
                <ThemedText type="link" color='#3B4443'>{description}</ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    toggleOption: {
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    image: {
        width: 30,
        height: 10,
    },
    containerCard: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    containerCardAll: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'flex-start',
    },
    containerCardBrand: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },


});

export default ToggleGroup;


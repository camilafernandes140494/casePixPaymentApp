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
    children?: { id: number; component: React.ReactNode }[];

}

const ToggleGroup = ({ options, onSelect, children }: ToggleGroupProps) => {
    const [selectedId, setSelectedId] = useState<number>(options[0].id);

    const handleSelect = (id: number) => {
        setSelectedId(id);
        onSelect(id);
    };

    return (
        <View style={styles.container}>
            {options.map((option) => (
                <View key={option.id}>
                    <TouchableOpacity
                        style={[styles.toggleOption]}
                        onPress={() => handleSelect(option.id)}
                    >
                        <ToggleItem key={option.id} title={option.title} description={option.description} checked={selectedId === option.id} />
                    </TouchableOpacity>
                    {children && children.map((child) => {
                        if (child.id === option.id) {
                            return <View key={child.id}>{child.component}</View>;
                        }
                        return null;
                    })}
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
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 4px 6px rgba(59, 68, 67, 0.3)',
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


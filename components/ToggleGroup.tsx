import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import VisaLogo from '@/assets/svg/visa.svg';

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
                        style={[styles.toggleOption, selectedId === option.id && styles.selectedOption]}
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
        <View>
            <Ionicons name={checked ? "radio-button-on-outline" : 'radio-button-off-outline'} size={30} color='#00726D' />
            <VisaLogo width={50} height={30} />

            <Text > {title} </Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    toggleOption: {
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    selectedOption: {
        borderColor: '#4CAF50',
        backgroundColor: '#e0f7e0',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedTitle: {
        color: '#4CAF50',
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    toggleText: {
        marginTop: 10,
        fontSize: 14,
        color: '#333',
    },
});

export default ToggleGroup;


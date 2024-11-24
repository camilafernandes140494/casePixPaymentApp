import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ToggleGroup from '@/components/ToggleGroup';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleToggleSelect = (id: number) => {
    setSelectedOption(id);
  };

  const toggleOptions = [
    { id: 1, title: 'visa', description: 'Final ****1234' },
    { id: 2, title: 'mastercard', description: 'Final ****1234' },
    { id: 3, title: 'visa', description: 'Final ****1234' },
  ];
  return (
    <View style={styles.container}>
      <TouchableOpacity >
        <Ionicons name="arrow-back" size={24} color="#004D49" />
      </TouchableOpacity>
      <ThemedText type="title">Transferência Pix</ThemedText>
      <ThemedText type="subtitle">Conta Midway</ThemedText>
      <ThemedText type="subtitle">Escolha uma forma de pagamento</ThemedText>

      <ToggleGroup
        options={toggleOptions}
        onSelect={handleToggleSelect}
        children={<ThemedText type="title" >Cartões de crédito</ThemedText>}
        childrenPosition={1} />

      {selectedOption && (
        <ThemedText style={styles.selectedText}>
          Você selecionou a opção {selectedOption}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    color: '#4CAF50',
  },
});

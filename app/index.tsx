import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ToggleGroup from '@/components/ToggleGroup';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PaymentInstallmentsModal from '@/components/PaymentInstallmentsModal';
import ProcessingTransferModal from '@/components/ProcessingTransferModal';

export default function HomeScreen() {
  const toggleOptions = [
    { id: 1, title: 'Saldo em conta', description: 'Disponível: R$ 2.000' },
    { id: 2, title: 'mastercard', description: 'Final ****1234' },
    { id: 3, title: 'visa', description: 'Final ****1234' },
  ];

  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [processingTransfer, setProcessingTransfer] = useState<boolean>(false);


  const handleToggleSelect = (id: number) => {
    setSelectedOption(id);
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProcessingTransferModal isOpen={processingTransfer} />
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="arrow-back" size={24} color="#004D49" />
          </TouchableOpacity>
          <ThemedText type="title">Transferência Pix</ThemedText>
        </View>

        <ThemedText type="defaultSemiBold">Escolha uma forma de pagamento</ThemedText>

        <ThemedText type="defaultSemiBold">Conta Midway</ThemedText>

        <ToggleGroup
          options={toggleOptions}
          onSelect={handleToggleSelect}
          children={
            [{
              id: toggleOptions[0].id,
              component: <View style={styles.headerCred}><ThemedText type="title" >Cartões de crédito</ThemedText></View>
            },
            {
              id: selectedOption,
              component: selectedOption !== toggleOptions[0].id && <PaymentInstallmentsModal />

            }
            ]
          }
        />


        {selectedOption && (
          <ThemedText style={styles.selectedText}>
            Você selecionou a opção {selectedOption}
          </ThemedText>
        )}

      </ScrollView>
      <View style={styles.footer}>
        <View >
          <ThemedText >
            Valor a ser pago
          </ThemedText>
          <ThemedText type='defaultSemiBold'>
            R$ 100,00
          </ThemedText>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={() => setProcessingTransfer(!processingTransfer)}>
          <ThemedText type="subtitle" style={styles.payButtonText}>
            Pagar
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7'
  },
  header: {
    display: 'flex',
    flexDirection: "column",
    alignItems: 'flex-start',
    gap: 24,
    width: "100%"
  },
  headerCred: {
    padding: 30,
    alignItems: 'center'
  },
  iconContainer: {
    backgroundColor: '#E5FFFE',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    display: 'flex',
    flexDirection: "column",
    padding: 16,
    gap: 24
  },
  selectedText: {
    marginTop: 20,
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  payButton: {
    backgroundColor: '#00726D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
  },

  payButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

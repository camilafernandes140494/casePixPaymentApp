import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Payment, PaymentSimulation } from '@/services/services.types';
import { formatCurrency } from '@/utils/formatCurrency';

interface PaymentInstallmentsModalProps {
  simulation?: Payment
  onSelect: (selected: PaymentSimulation | null) => void;

}

const PaymentInstallmentsModal = ({ simulation, onSelect }: PaymentInstallmentsModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<PaymentSimulation | null>(null);

  const openModal = () => setModalVisible(true);

  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);


  const handleSelect = (installments: PaymentSimulation) => {
    setSelectedOption(installments);
    closeModal()
    onSelect(installments)
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={[
          styles.openButton,
          { justifyContent: 'center', },
        ]}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={openModal} style={styles.openButton}>
            <ThemedText type='defaultSemiBold' color='#00726D'>
              {selectedOption ? `${selectedOption.installments} x de ${formatCurrency(selectedOption.installmentAmount)}` : 'Escolher parcelas'}
            </ThemedText>
            <Ionicons name="chevron-forward-outline" size={24} color="#00726D" />
          </TouchableOpacity>
          {selectedOption && <TransactionSummary
            installmentFee={formatCurrency(selectedOption.fees.installments.amount)}
            transferAmount={formatCurrency(selectedOption.amountToPay)}
            cardFee={formatCurrency(selectedOption.fees.fixed.amount)}
            totalAmount={`${selectedOption.installments} x de ${formatCurrency(selectedOption.installmentAmount)}`}
          />}
        </View>
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <TouchableOpacity onPress={closeModal} style={styles.iconContainer}>
                <Ionicons name="close-outline" size={24} color="#004D49" />
              </TouchableOpacity>
              <ThemedText type="title">Parcelas do pagamento</ThemedText>
            </View>
            <ThemedText type='defaultSemiBold'>O destinatário receberá à vista e você
              pagará parcelado.</ThemedText>
            <FlatList
              data={simulation?.simulation}
              keyExtractor={(item) => item.installments.toString()}
              style={{ width: '100%' }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item)}
                >
                  <Ionicons name={selectedOption?.installments === item.installments ? "radio-button-on-outline" : 'radio-button-off-outline'} size={30} color='#00726D' />
                  <ThemedText type="defaultSemiBold" color='#00726D'>{item.installments}x de {formatCurrency(item.installmentAmount)}</ThemedText>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};


interface TransactionSummaryProps {
  transferAmount: string;
  cardFee: string;
  installmentFee: string;
  totalAmount: string;
}

const TransactionSummary = ({ transferAmount, cardFee, installmentFee, totalAmount }: TransactionSummaryProps) => {

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF', padding: 16, }]}>
      <View style={styles.row}>
        <Text style={styles.label}>Valor a transferir</Text>
        <Text style={styles.value}>{transferAmount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Taxa do cartão</Text>
        <Text style={styles.value}>{cardFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Taxa de parcelamento</Text>
        <Text style={styles.value}>{installmentFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Valor a transferir + taxas</Text>
        <Text style={styles.value}>{totalAmount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: "column",
    alignItems: 'flex-start',
    gap: 24,
    width: "100%"
  },
  iconContainer: {
    backgroundColor: '#E5FFFE',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingBottom: 50,

  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    gap: 16,
    marginTop: 80,
    width: "100%",
    maxHeight: '90%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  row: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004D49',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 6px rgba(59, 68, 67, 0.1)',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
    borderRadius: 8,
  },

});

export default PaymentInstallmentsModal;

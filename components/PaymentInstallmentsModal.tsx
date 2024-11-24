import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';

const PaymentInstallmentsModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const openModal = () => setModalVisible(true);

  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <TouchableOpacity onPress={openModal} style={styles.openButton}>
          <ThemedText type='defaultSemiBold' color='#00726D'>Escolher parcelas</ThemedText>
          <Ionicons name="chevron-forward-outline" size={24} color="#00726D" />
        </TouchableOpacity>
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <TouchableOpacity onPress={closeModal} style={styles.iconContainer}>
                <Ionicons name="close-outline" size={24} color="#004D49" />
              </TouchableOpacity>
              <ThemedText type="title">Parcelas do pagamento</ThemedText>

            </View>
            <ThemedText type="title">Transferência Pix</ThemedText>
            <ThemedText type='defaultSemiBold'>O destinatário receberá à vista e você
              pagará parcelado.</ThemedText>

          </View>
        </View>
      </Modal>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
  },
  modal: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },

});

export default PaymentInstallmentsModal;

import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ToggleGroup, { ToggleOption } from '@/components/ToggleGroup';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PaymentInstallmentsModal from '@/components/PaymentInstallmentsModal';
import ProcessingTransferModal from '@/components/ProcessingTransferModal';
import PixSuccessfullyModal from '@/components/PixSuccessfullyModal';
import { getAccountData } from '@/services/services.api';
import { AccountData, PaymentSimulation } from '@/services/services.types';
import { formatCurrency } from '@/utils/formatCurrency';


export default function HomeScreen() {
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [payments, setPayments] = useState<PaymentSimulation | null>(null);

  useEffect(() => {
    getAccountData()
      .then((data) => {
        setAccountData(data);
      })
      .catch((error) => {
        console.error("Error fetching account data", error);
      });
  }, []);


  const [selectedOption, setSelectedOption] = useState<number | string>(0);
  const [processingTransfer, setProcessingTransfer] = useState<boolean>(false);
  const [pixSuccessfully, setPixSuccessfully] = useState<boolean>(false);


  const handleToggleSelect = (id: number | string) => {
    setSelectedOption(id);
  };


  const transformDataToToggleOptions = (data: AccountData | null): ToggleOption[] => {
    if (!data) {
      return []
    }
    const options: ToggleOption[] = [];

    options.push({
      id: data.account.accountId,
      title: "Saldo em Conta",
      description: `Disponível ${formatCurrency(data.account.balance)}`,
    });

    data.account.cards.forEach((card) => {
      options.push({
        id: card.cardId,
        title: `Cartão ${card.brand}`,
        description: `Final ${card.cardNumber}`,
      });
    });

    return options;
  };

  const [toggleOptionsData, setToggleOptionsData] = useState(transformDataToToggleOptions(accountData || null))

  useEffect(() => { setToggleOptionsData(transformDataToToggleOptions(accountData || null)) }, [accountData])

  if (toggleOptionsData.length === 0) {
    return <View style={[
      { flex: 1, justifyContent: 'center', alignItems: "center" },
    ]}>
      <ActivityIndicator size="large" color="#008d86" />
    </View>;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProcessingTransferModal
          isOpen={processingTransfer}
          onClose={() => { setProcessingTransfer(false), setPixSuccessfully(true) }}
        />
        <PixSuccessfullyModal
          isOpen={pixSuccessfully}
          onClose={() => setPixSuccessfully(false)}
          name={accountData?.account.owner.name || ''}
          price={`${payments?.installments} x de ${formatCurrency(payments?.installmentAmount || 0)}`}
          date='06/12/2024'
        />
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="arrow-back" size={24} color="#004D49" />
          </TouchableOpacity>
          <ThemedText type="title">Transferência Pix</ThemedText>
        </View>

        <ThemedText type="defaultSemiBold">Escolha uma forma de pagamento</ThemedText>

        <ThemedText type="defaultSemiBold">Conta Midway</ThemedText>

        <ToggleGroup
          options={toggleOptionsData}
          onSelect={handleToggleSelect}
          children={
            [{
              id: toggleOptionsData[0].id,
              component: <View style={styles.headerCred}><ThemedText type="title" >Cartões de crédito</ThemedText></View>
            },
            {
              id: selectedOption,
              component: selectedOption !== toggleOptionsData[0].id && (
                <PaymentInstallmentsModal
                  simulation={accountData?.payment}
                  onSelect={(payments) => setPayments(payments)}
                />)

            }
            ]
          }
        />
      </ScrollView>
      <View style={styles.footer}>
        <View >
          <ThemedText >
            Valor a ser pago
          </ThemedText>
          <ThemedText type='defaultSemiBold'>
            {payments ? `${payments?.installments} x de ${formatCurrency(payments?.installmentAmount || 0)}` : formatCurrency(Number(toggleOptionsData[0].description))}
          </ThemedText>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={() => setProcessingTransfer(true)}>
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

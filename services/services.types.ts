type Card = {
  cardId: string;
  name: string;
  securityCode: string;
  cardNumber: string;
  holder: string;
  expirationDate: string;
  brand: string;
  favorite: boolean;
  used: boolean;
};

type Owner = {
  name: string;
  id: string;
};

type Account = {
  accountId: string;
  balance: number;
  currency: string;
  status: string;
  owner: Owner;
  cards: Card[];
};

type Fees = {
  fixed: {
    amount: number;
    percentage: number;
  };
  installments: {
    amount: number;
    percentage: number;
  };
};

type PaymentSimulation = {
  amountToPay: number;
  installmentAmount: number;
  installments: number;
  fees: Fees;
};

type Receiver = {
  name: string;
  id: string;
};

type Payment = {
  transactionId: string;
  amount: number;
  currency: string;
  receiver: Receiver;
  method: string;
  simulation: PaymentSimulation[];
};

export type AccountData = {
  account: Account;
  payment: Payment;
};

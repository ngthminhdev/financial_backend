export enum WalletType {
  Default = 1,
  Spent = 2,
  Invest = 3,
  Goat = 4,
}

export const VALID_WALLET = [WalletType.Default, WalletType.Spent, WalletType.Invest, WalletType.Goat];

export enum TransactionType {
  Income = 1,
  Spent = 2,
}

export const VALID_TRANSACTION = [TransactionType.Income, TransactionType.Spent];

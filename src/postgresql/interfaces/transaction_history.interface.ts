export interface ITransactionHistory {
    id?: string;
    goat_id?: string;
    wallet_id?: string;
    category_id: string;
    user_id: string;
    amount: number;
    balance_from: number;
    balance_to: number;
    created_at: string;
    modified_at: string;
}

export interface IInOutTransaction {
    type: number;
    amount: number;
}

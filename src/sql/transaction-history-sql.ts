export const  transactionHistoryScript = `CREATE TABLE IF NOT EXISTS public.transaction_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_id UUID,
    category_id UUID,
    user_id UUID,
    note VARCHAR(255),
    amount DECIMAL(18, 2),
    balance_from DECIMAL(18, 2),
    balance_to DECIMAL(18, 2),
    type SMALLINT DEFAULT 2,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES public.category(id),
    FOREIGN KEY (wallet_id) REFERENCES public.wallet(id),
    FOREIGN KEY (user_id) REFERENCES public.user(id)
);

CREATE INDEX IF NOT EXISTS idx_transaction_history_id ON public.transaction_history (id);
`;

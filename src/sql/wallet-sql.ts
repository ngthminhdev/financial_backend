export const  walletScript = `CREATE TABLE IF NOT EXISTS public.wallet (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    name VARCHAR(255) DEFAULT 'Mặc định',
    balance DECIMAL(18, 2),
    type SMALLINT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES public.user(id)
);

CREATE INDEX IF NOT EXISTS idx_wallet_balance ON public.wallet (balance);
`;

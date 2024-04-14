export const  goatScript = `CREATE TABLE IF NOT EXISTS public.goat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    wallet_id UUID,
    name VARCHAR(255),
    target_budget DECIMAL(18, 2),
    amount_spent DECIMAL(18, 2),
    priority SMALLINT DEFAULT 1,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (wallet_id) REFERENCES public.wallet(id),
    FOREIGN KEY (user_id) REFERENCES public.user(id)
);
`;

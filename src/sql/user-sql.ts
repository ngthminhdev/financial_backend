export const  userScript = `CREATE TABLE IF NOT EXISTS public.user (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_name VARCHAR(255),
    user_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(10),
    password VARCHAR(255),
    avatar TEXT,
    role SMALLINT DEFAULT 1,
    status SMALLINT DEFAULT 0,
    permissions VARCHAR(255)[],
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_account_name_password ON public.user (account_name);

CREATE INDEX IF NOT EXISTS idx_user_permissions ON public.user (permissions);
`;

export const userConfigScript = `CREATE TABLE IF NOT EXISTS public.user_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    type SMALLINT DEFAULT 1,
    start_date SMALLINT DEFAULT 5,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES public.user(id)
);`;

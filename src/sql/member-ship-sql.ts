export const  memberShipScript = `CREATE TABLE IF NOT EXISTS public.member_ship (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    name VARCHAR(255) DEFAULT 'Mặc định',
    type SMALLINT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES public.user(id)
);

CREATE INDEX IF NOT EXISTS idx_member_ship_user_id ON public.member_ship (user_id);
`;

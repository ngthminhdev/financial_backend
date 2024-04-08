export const categoryScript = `CREATE TABLE IF NOT EXISTS public.category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    status smallint DEFAULT 1,
    icon smallint DEFAULT 0,
    name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_category_id ON public.category (id);

CREATE INDEX IF NOT EXISTS idx_category_name_status ON public.category (name, STATUS);
`;
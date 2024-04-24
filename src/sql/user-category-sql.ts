export const  userCategoryScript = `CREATE TABLE IF NOT EXISTS public.user_category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    category_id UUID,
    max_budget DECIMAL(18, 2) DEFAULT null,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES public.user(id),
    FOREIGN KEY (category_id) REFERENCES public.category(id)
);

CREATE INDEX IF NOT EXISTS idx_user_category_max_budget ON public.user_category (max_budget);
`;

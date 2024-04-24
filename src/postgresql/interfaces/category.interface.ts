export interface ICategory {
    id: string;
    name: string;
    status: number;
    created_at: string;
    modified_at: string;
};

export interface IUserCategory {
    id: string;
    user_id: string;
    category_id: string;
    max_budget: number;
}

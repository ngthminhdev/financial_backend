export interface IUser {
    id: string;
    account_name: string;
    user_name: string;
    email?: string;
    password: string;
    status: number;
    role: number;
    permissions: string[];
    created_at: string;
    modified_at: string;
}

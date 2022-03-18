export const queryList = ['email', 'name', 'country', 'page', 'limit'];

export type Query = {
    page?: number;
    limit?: number;
    email?: string;
    name?: string;
    offset?: number
    userId?: string;
    raw: boolean;
    order?: any
    where?: any
}

export type QueryStrings = {
    page?: string;
    limit?: string;
    email?: string;
    name?: string;
    userId?: string;
    download?: string;
}
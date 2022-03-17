export const queryList = ['email', 'name', 'country', 'page', 'limit'];

export type Query = {
    page?: number;
    limit?: number;
    email?: string;
    name?: string;
    offset?: number
}

export type QueryStrings = {
    page?: string;
    limit?: string;
    email?: string;
    name?: string;
    offset?: string
}

export function isQueryValid (query: any) {
    if (typeof query !== 'object') return false;

    const getValidQuery = queryList.find(item => item === query[item]);

    if(!getValidQuery || typeof getValidQuery === 'undefined') {
        return false
    } else {
        return true
    }
}
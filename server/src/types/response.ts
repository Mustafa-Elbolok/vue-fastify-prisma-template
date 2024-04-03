/** @format */

export interface Pagination {
    page: number;
    limit: number;
    total: number;
}

export interface Error {
    message: string;
    code?: string;
}

export interface Result {
    status?: number;
    data?: any;
    error?: Error;
    pagination?: Pagination;
    details?: string;
}

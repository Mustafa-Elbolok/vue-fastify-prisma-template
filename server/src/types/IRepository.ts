/** @format */

export type SearchKey<T> = {
    [K in keyof T]: {
        key: K;
        value: T[K];
    };
}[keyof T];

export type AvailableInputs<T> = Omit<Partial<T>, 'id' | 'created_at' | 'updated_at'>;

export default interface IRepository<T> {
    Add(obj: Partial<T>): Promise<T>;
    findAll(page: number, limit: number, query?: Partial<T> | string): Promise<T[]>;
    findByKey(search: SearchKey<T>): Promise<T | null>;
    deleteByKey(key: string): Promise<T>;
    updateByKey(key: string, data: T): Promise<T | null>;
    count(query?: Partial<T>): Promise<any>;
}

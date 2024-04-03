export type User = {
    id: string | number;
    email: string;
    password: string;
    created_at?: string;
    updated_at?: string;
};

export type Category = {
    id: string | number;
    name: string;
    parent_id: number | null;
    level?: number;
    picture?: string;
    created_at?: Date;
    updated_at?: Date;
    parent?: string;
    subCategoriesCount?: number;
    productsCount?: number;
};

export type Product = {
    id: string | number;
    name: string;
    category_id: number | null;
    category?: {
        name?: string;
    };
    picture?: string;
    created_at?: Date;
    updated_at?: Date;
};

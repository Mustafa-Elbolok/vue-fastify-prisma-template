/** @format */

import db, { queryHandler } from '../helpers/db';
import picturesReducer from '../helpers/getPicturesArray';
import storage from '../helpers/storage';
import IRepository, { AvailableInputs } from '../types/IRepository';
import { Category, Product } from '@prisma/client';

export interface PaginatedCategoryData extends Category {
    category: Partial<Category>;
    subCategories?: Category[];
    products: Product[];
}

type Where = {
    level?: number;
    parent_id?: number;
    name?: string | { contains: string };
};

interface RequiredInputs extends AvailableInputs<Category> {
    name: string;
    picture: string;
    level: number;
}

export default class CategoryRepository implements Partial<IRepository<Category>> {
    async findAll(page: number = 1, take: number = 25, query?: Partial<Category>): Promise<PaginatedCategoryData[]> {
        return await queryHandler(async () => {
            let where: Where = {};
            if (query?.level) where.level = query.level;
            if (query?.parent_id) where.parent_id = query.parent_id;
            if (query?.name) where.name = { contains: query.name };

            return await db.category.findMany({
                where,
                take,
                skip: (page - 1) * take,
                orderBy: { ['level']: 'desc' },
                include: {
                    category: { select: { name: true } },
                    subCategories: { select: { _count: true } },
                    products: { select: { id: true } },
                },
            });
        });
    }
    async findById(id: number): Promise<Category | null> {
        return await queryHandler(async () => {
            return await db.category.findUnique({ where: { id } });
        });
    }
    async Add(data: RequiredInputs): Promise<Category> {
        data;
        return await queryHandler(async () => {
            return await db.category.create({ data });
        });
    }
    async updateById(id: number, data: AvailableInputs<Category>): Promise<Category | null> {
        return await queryHandler(async () => {
            return await db.category.update({ where: { id }, data });
        });
    }
    async deleteById(id: number): Promise<Category | null> {
        return await queryHandler(async () => {
            const categories = await db.category.findMany({
                where: { id },
                include: {
                    category: { select: { picture: true } },
                    subCategories: {
                        include: {
                            category: { select: { picture: true } },
                            subCategories: {
                                select: {
                                    picture: true,
                                    products: { select: { picture: true } },
                                },
                            },
                            products: { select: { picture: true } },
                        },
                    },
                    products: { select: { picture: true } },
                },
            });
            const pictures = picturesReducer(categories);
            const result = await db.category.delete({ where: { id } });
            if (result) for (const picture of pictures) storage.remove(picture);

            return result;
        });
    }
    async count(query?: Partial<Category>): Promise<number> {
        return await queryHandler(async () => {
            let where: Where = {};
            if (query?.level) where.level = query.level;
            if (query?.parent_id) where.parent_id = query.parent_id;
            if (query?.name) where.name = { contains: query.name };

            return await db.category.count({ where });
        });
    }
}

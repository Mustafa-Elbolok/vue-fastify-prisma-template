/** @format */

import db, { queryHandler } from '../helpers/db';
import IRepository, { AvailableInputs } from '../types/IRepository';
import { Product } from '@prisma/client';

type Where = {
    category_id?: number;
    name?: string | { contains: string };
};

interface RequiredInputs extends AvailableInputs<Product> {
    name: string;
    picture: string;
    category_id: number;
}

export default class ProductRepository implements Partial<IRepository<Product>> {
    async findAll(page: number = 1, take: number = 25, query?: Partial<Product>): Promise<Product[]> {
        return await queryHandler(async () => {
            let where: Where = {};
            if (query?.category_id) where.category_id = query.category_id;
            if (query?.name) where.name = { contains: query.name };

            return await db.product.findMany({
                where,
                take,
                skip: (page - 1) * take,
                orderBy: { ['created_at']: 'desc' },
                include: {
                    category: { select: { name: true } },
                },
            });
        });
    }
    async findById(id: number): Promise<Product | null> {
        return await queryHandler(async () => {
            return await db.product.findUnique({ where: { id } });
        });
    }
    async Add(data: RequiredInputs): Promise<Product> {
        data;
        return await queryHandler(async () => {
            return await db.product.create({ data });
        });
    }
    async updateById(id: number, data: AvailableInputs<Product>): Promise<Product | null> {
        return await queryHandler(async () => {
            return await db.product.update({ where: { id }, data });
        });
    }
    async deleteById(id: number): Promise<Product | null> {
        return await queryHandler(async () => {
            return await db.product.delete({ where: { id } });
        });
    }
    async count(query?: Partial<Product>): Promise<number> {
        return await queryHandler(async () => {
            let where: Where = {};
            if (query?.category_id) where.category_id = query.category_id;
            if (query?.name) where.name = { contains: query.name };

            return await db.product.count({ where });
        });
    }
}

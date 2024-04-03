/** @format */

import { Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';
import schemaTypes from '../../types/schemaTypes';

const schema = {
    getAllProducts: {
        querystring: Type.Object({
            ...schemaTypes.pagination,
            search: Type.Optional(schemaTypes.search),
            category: Type.Optional(schemaTypes.id),
        }),
    },
    getProductById: {
        params: Type.Object({
            id: schemaTypes.id,
        }),
    },
    createProduct: {
        body: Type.Object({
            name: schemaTypes.name,
            category_id: schemaTypes.id,
        }),
    },
    updateProduct: {
        params: Type.Object({
            id: schemaTypes.id,
        }),
        body: Type.Object({
            name: Type.Optional(schemaTypes.name),
            category_id: Type.Optional(schemaTypes.id),
        }),
    },
    removeProduct: {
        params: Type.Object({
            id: schemaTypes.id,
        }),
    },
} satisfies { [key: string]: FastifySchema };

export type ProductSchema = typeof schema;
export default schema;

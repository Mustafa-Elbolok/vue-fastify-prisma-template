/** @format */

import { Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';
import schemaTypes from '../../types/schemaTypes';

const schema = {
    getAllCategories: {
        querystring: Type.Object({
            ...schemaTypes.pagination,
            search: Type.Optional(schemaTypes.search),
            category: Type.Optional(schemaTypes.id),
        }),
    },
    getCategoryById: {
        params: Type.Object({
            id: schemaTypes.id,
        }),
    },
    createCategory: {
        body: Type.Object({
            name: schemaTypes.name,
            level: schemaTypes.level,
            parent_id: Type.Optional(schemaTypes.id),
        }),
    },
    updateCategory: {
        params: Type.Object({
            id: schemaTypes.id,
        }),
        body: Type.Object({
            name: Type.Optional(schemaTypes.name),
            level: Type.Optional(schemaTypes.level),
            parent_id: Type.Optional(schemaTypes.id),
        }),
    },
    removeCategory: {
        params: Type.Object({
            id: schemaTypes.id,
        }),
    },
} satisfies { [key: string]: FastifySchema };

export type CategorySchema = typeof schema;
export default schema;

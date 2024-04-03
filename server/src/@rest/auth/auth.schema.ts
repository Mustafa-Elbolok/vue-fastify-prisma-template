/** @format */

import { Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';
import schemaTypes from '../../types/schemaTypes';

const schema = {
    login: {
        body: Type.Object({
            email: schemaTypes.email,
            password: schemaTypes.password,
        }),
    },
} satisfies { [key: string]: FastifySchema };

export type AuthSchema = typeof schema;
export default schema;

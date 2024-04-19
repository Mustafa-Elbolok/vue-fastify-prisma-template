/** @format */

import { Type } from '@sinclair/typebox';

export type SchemaErrorDetails = {
    as: string;
    valid: {
        [key: string]: any;
    };
    reason: string;
    field?: string;
};

export default {
    id: Type.Number({
        minimum: 1,
    }),
    email: Type.String({
        minLength: 5,
        maxLength: 50,
        format: 'email',
    }),
    password: Type.String({
        minLength: 8,
        maxLength: 32,
    }),
    name: Type.String({
        minLength: 5,
        maxLength: 50,
        format: 'regex',
    }),
    pagination: {
        page: Type.Optional(
            Type.Number({
                minimum: 1,
                default: 1,
            }),
        ),
        limit: Type.Optional(
            Type.Number({
                minimum: 5,
                maximum: 100,
                default: 25,
                multipleOf: 5,
            }),
        ),
    },
    search: Type.Optional(
        Type.String({
            maxLength: 50,
            format: 'regex',
        }),
    ),
    level: Type.Number({
        minimum: 1,
    }),
    picturePath: Type.String({
        maxLength: 150,
    }),
};

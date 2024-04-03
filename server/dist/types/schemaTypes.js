"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const typebox_1 = require("@sinclair/typebox");
exports.default = {
    id: typebox_1.Type.Number({
        minimum: 1,
    }),
    email: typebox_1.Type.String({
        minLength: 5,
        maxLength: 50,
        format: 'email',
    }),
    password: typebox_1.Type.String({
        minLength: 8,
        maxLength: 32,
    }),
    name: typebox_1.Type.String({
        minLength: 5,
        maxLength: 50,
        format: 'regex',
    }),
    pagination: {
        page: typebox_1.Type.Optional(typebox_1.Type.Number({
            minimum: 1,
            default: 1,
        })),
        limit: typebox_1.Type.Optional(typebox_1.Type.Number({
            minimum: 5,
            maximum: 100,
            default: 25,
            multipleOf: 5,
        })),
    },
    search: typebox_1.Type.Optional(typebox_1.Type.String({
        maxLength: 50,
        format: 'regex',
    })),
    level: typebox_1.Type.Number({
        minimum: 1,
    }),
    picturePath: typebox_1.Type.String({
        maxLength: 150,
    }),
};

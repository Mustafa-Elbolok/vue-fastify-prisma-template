"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typebox_1 = require("@sinclair/typebox");
const schemaTypes_1 = __importDefault(require("../../types/schemaTypes"));
const schema = {
    getAllCategories: {
        querystring: typebox_1.Type.Object(Object.assign(Object.assign({}, schemaTypes_1.default.pagination), { search: typebox_1.Type.Optional(schemaTypes_1.default.search), category: typebox_1.Type.Optional(schemaTypes_1.default.id) })),
    },
    getCategoryById: {
        params: typebox_1.Type.Object({
            id: schemaTypes_1.default.id,
        }),
    },
    createCategory: {
        body: typebox_1.Type.Object({
            name: schemaTypes_1.default.name,
            level: schemaTypes_1.default.level,
            parent_id: typebox_1.Type.Optional(schemaTypes_1.default.id),
        }),
    },
    updateCategory: {
        params: typebox_1.Type.Object({
            id: schemaTypes_1.default.id,
        }),
        body: typebox_1.Type.Object({
            name: typebox_1.Type.Optional(schemaTypes_1.default.name),
            level: typebox_1.Type.Optional(schemaTypes_1.default.level),
            parent_id: typebox_1.Type.Optional(schemaTypes_1.default.id),
        }),
    },
    removeCategory: {
        params: typebox_1.Type.Object({
            id: schemaTypes_1.default.id,
        }),
    },
};
exports.default = schema;

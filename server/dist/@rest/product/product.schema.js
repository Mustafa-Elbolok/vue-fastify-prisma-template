"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typebox_1 = require("@sinclair/typebox");
const schemaTypes_1 = __importDefault(require("../../types/schemaTypes"));
const schema = {
    getAllProducts: {
        querystring: typebox_1.Type.Object(Object.assign(Object.assign({}, schemaTypes_1.default.pagination), { search: typebox_1.Type.Optional(schemaTypes_1.default.search), category: typebox_1.Type.Optional(schemaTypes_1.default.id) })),
    },
    getProductById: {
        params: typebox_1.Type.Object({
            id: schemaTypes_1.default.id,
        }),
    },
    createProduct: {
        body: typebox_1.Type.Object({
            name: schemaTypes_1.default.name,
            category_id: schemaTypes_1.default.id,
        }),
    },
    updateProduct: {
        params: typebox_1.Type.Object({
            id: schemaTypes_1.default.id,
        }),
        body: typebox_1.Type.Object({
            name: typebox_1.Type.Optional(schemaTypes_1.default.name),
            category_id: typebox_1.Type.Optional(schemaTypes_1.default.id),
        }),
    },
    removeProduct: {
        params: typebox_1.Type.Object({
            id: schemaTypes_1.default.id,
        }),
    },
};
exports.default = schema;

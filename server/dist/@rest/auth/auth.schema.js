"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typebox_1 = require("@sinclair/typebox");
const schemaTypes_1 = __importDefault(require("../../types/schemaTypes"));
const schema = {
    login: {
        body: typebox_1.Type.Object({
            email: schemaTypes_1.default.email,
            password: schemaTypes_1.default.password,
        }),
    },
};
exports.default = schema;

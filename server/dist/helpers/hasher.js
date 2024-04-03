"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const { compareSync, hashSync } = bcryptjs_1.default;
exports.default = {
    gen: (value) => hashSync(value, 9),
    test: (value, hash) => compareSync(value, hash),
};

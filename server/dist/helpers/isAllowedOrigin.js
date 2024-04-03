"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whiteList_origins_json_1 = __importDefault(require("../whiteList.origins.json"));
function default_1(origin) {
    return whiteList_origins_json_1.default.includes(origin);
}
exports.default = default_1;

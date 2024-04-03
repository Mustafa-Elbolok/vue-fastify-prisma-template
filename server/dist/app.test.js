"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = void 0;
const _1 = require(".");
exports.listen = new Promise((resolve, reject) => {
    _1.app.listen({ port: 3000, host: '0.0.0.0' }).then(resolve).catch(reject);
});
describe('Test hosting the application', () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield _1.app.close();
    }));
    test('It should response with hosted url', () => {
        const serving = new Promise((resolve, reject) => {
            _1.app.listen({ port: 3000, host: '0.0.0.0' }).then(resolve).catch(reject);
        });
        return serving.then(() => {
            expect(serving).resolves;
        });
    });
});

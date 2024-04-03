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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const __1 = require("../..");
const auth_test_1 = require("../auth/auth.test");
describe('Test category apis', () => {
    let agent;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        return __1.app.ready().then(() => __awaiter(void 0, void 0, void 0, function* () {
            agent = supertest_1.default.agent(__1.app.server);
            const response = yield (0, auth_test_1.authenticate)(agent);
            agent.set('Cookie', response.headers['set-cookie']);
            return agent;
        }));
    }));
    test('Test getting all categories api', () => {
        return agent.get('/api/category/').then((response) => __awaiter(void 0, void 0, void 0, function* () {
            expect(response.statusCode).toBe(200);
        }));
    });
});

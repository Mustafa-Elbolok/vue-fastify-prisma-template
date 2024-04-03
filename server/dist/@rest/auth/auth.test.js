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
exports.authenticate = void 0;
const supertest_1 = __importDefault(require("supertest"));
const __1 = require("../..");
const dummy_test_json_1 = require("../../dummy.test.json");
const authenticate = (agent) => agent.post('/login').send(dummy_test_json_1.users.admin);
exports.authenticate = authenticate;
describe('Test authentication', () => {
    let agent;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        return __1.app.ready().then(() => __awaiter(void 0, void 0, void 0, function* () {
            agent = supertest_1.default.agent(__1.app.server);
            return agent;
        }));
    }));
    test('Test login as admin', () => {
        return (0, exports.authenticate)(agent).then((response) => __awaiter(void 0, void 0, void 0, function* () {
            const result = JSON.parse(response.text);
            expect(result.details).toBe('Logged in successfully.');
        }));
    });
    test('Test login as unregistered user', () => {
        return agent
            .post('/login')
            .send({ email: 'user@banned.com', password: 'new-user-password' })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            const result = JSON.parse(response.text);
            expect(result.details).toBe('Invalid credentials.');
        }));
    });
    test('Test login without email', () => {
        return agent
            .post('/login')
            .send({ password: 'new-user-password' })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            const result = JSON.parse(response.text);
            expect(result.message).toBe("must have required property 'email'");
        }));
    });
    test('Test login without password', () => {
        return agent
            .post('/login')
            .send({ email: 'user@banned.com' })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            const result = JSON.parse(response.text);
            expect(result.message).toBe("must have required property 'password'");
        }));
    });
    test('Test login with invalid email', () => {
        return agent
            .post('/login')
            .send({ email: 'userbanned.com', password: 'new-user-password' })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            const result = JSON.parse(response.text);
            expect(result.message).toBe('email must match format "email"');
        }));
    });
    test('Test login with short password', () => {
        return agent
            .post('/login')
            .send({ email: 'user@banned.com', password: 'new' })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            const result = JSON.parse(response.text);
            expect(result.message).toBe('password must NOT have fewer than 8 characters');
        }));
    });
    test('Test login with long password', () => {
        return agent
            .post('/login')
            .send({ email: 'user@banned.com', password: 'this-text-is-longer-than-32-character' })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            const result = JSON.parse(response.text);
            expect(result.message).toBe('password must NOT have more than 32 characters');
        }));
    });
    test('Test login with short email', () => {
        return agent
            .post('/login')
            .send({ email: 'e@m', password: 'good-password' })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            const result = JSON.parse(response.text);
            expect(result.message).toBe('email must NOT have fewer than 5 characters');
        }));
    });
    test('Test login with long email', () => {
        return agent
            .post('/login')
            .send({ email: 'email@this-text-is-much-longer-than-50-characters.com', password: 'good-password' })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            const result = JSON.parse(response.text);
            expect(result.message).toBe('email must NOT have more than 50 characters');
        }));
    });
});

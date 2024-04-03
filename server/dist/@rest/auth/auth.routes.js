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
const auth_service_1 = __importDefault(require("./auth.service"));
const auth_schema_1 = __importDefault(require("./auth.schema"));
const authorization_1 = __importDefault(require("../../hooks/authorization"));
const service = new auth_service_1.default();
const authorization = new authorization_1.default();
function authRouter(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.decorateRequest('authRouter', '');
        app.post('/login', { schema: auth_schema_1.default.login }, service.login);
        app.post('/confirm', {
            onRequest: authorization.verify,
        }, service.confirm);
        app.get('/me', {
            onRequest: authorization.verify,
        }, service.me);
        app.delete('/logout', {
            onRequest: authorization.verify,
        }, service.logout);
    });
}
exports.default = authRouter;
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
const replyHandler_1 = __importDefault(require("../../helpers/replyHandler"));
class AuthService {
    confirm(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const domain = (_a = request.headers.origin) === null || _a === void 0 ? void 0 : _a.split('://')[1].split(':')[0];
                reply.setCookie('confirmation', 'confirmed', {
                    domain,
                    path: '/',
                    secure: true,
                    httpOnly: true,
                    sameSite: 'lax',
                    signed: true,
                    expires: new Date(Date.now() + 24 * 5 * 60 * 1000),
                });
                (0, replyHandler_1.default)(reply, {
                    status: 200,
                    details: 'Action confirmed.',
                    data: {
                        message: 'Action confirmed.',
                    },
                });
            }
            catch (error) {
                (0, replyHandler_1.default)(reply, {
                    status: 500,
                    details: 'Something went wrong, please try again later.',
                    error: { message: 'Something went wrong, please try again later.' },
                });
            }
        });
    }
}
exports.default = AuthService;

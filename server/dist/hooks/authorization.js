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
const replyHandler_1 = __importDefault(require("../helpers/replyHandler"));
const User_repository_1 = __importDefault(require("../repositories/User.repository"));
const userRepository = new User_repository_1.default();
class AuthorizationHook {
    verify(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!request.cookies['ST']) {
                    (0, replyHandler_1.default)(reply, {
                        status: 401,
                        details: 'Token not found',
                        error: {
                            message: 'Not authorized',
                            code: 'NO_TOKEN',
                        },
                    });
                    return;
                }
                yield request.jwtVerify();
                const { secret } = (yield request.jwtDecode());
                const user = yield userRepository.findByKey({ key: 'id', value: secret });
                if (!user) {
                    (0, replyHandler_1.default)(reply, {
                        status: 500,
                        details: 'Invalid token',
                        error: {
                            message: 'Not authorized',
                            code: 'INVALID_TOKEN',
                        },
                    });
                    return;
                }
                request.user = user;
            }
            catch (error) {
                (0, replyHandler_1.default)(reply, {
                    status: 500,
                    details: 'Invalid token',
                    error: {
                        message: 'Not authorized',
                        code: 'INVALID_TOKEN',
                    },
                });
            }
        });
    }
    confirm(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = request.user;
                const confirmedSince = new Date().getTime() - user.confirmed_at.getTime();
                // 5mins ago
                if (confirmedSince > 300000) {
                    (0, replyHandler_1.default)(reply, {
                        status: 401,
                        details: 'You need to confirm before doing this action',
                        error: {
                            message: 'No Confirmation',
                            code: 'NO_CONFIRMATION',
                        },
                    });
                    return;
                }
            }
            catch (error) {
                (0, replyHandler_1.default)(reply, {
                    status: 500,
                    details: 'Invalid confirmation',
                    error: {
                        message: 'Not authorized',
                        code: 'INVALID_CONFIRMATION',
                    },
                });
            }
        });
    }
}
exports.default = AuthorizationHook;

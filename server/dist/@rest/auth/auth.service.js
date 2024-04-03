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
const User_repository_1 = __importDefault(require("../../repositories/User.repository"));
const hasher_1 = __importDefault(require("../../helpers/hasher"));
const __1 = require("../..");
const userRepository = new User_repository_1.default();
class AuthService {
    login(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { email, password } = request.body;
            try {
                const user = yield userRepository.findByKey({ key: 'email', value: email });
                if (!user) {
                    (0, replyHandler_1.default)(reply, {
                        status: 404,
                        details: 'Invalid credentials.',
                        error: { message: 'Invalid credentials.' },
                    });
                    return;
                }
                if (!hasher_1.default.test(password, user === null || user === void 0 ? void 0 : user.password)) {
                    (0, replyHandler_1.default)(reply, {
                        status: 404,
                        details: 'Invalid credentials.',
                        error: { message: 'Invalid credentials.' },
                    });
                    return;
                }
                const token = __1.app.jwt.sign({ secret: user.id }, { expiresIn: '1d' });
                const domain = (_a = request.headers.origin) === null || _a === void 0 ? void 0 : _a.split('://')[1].split(':')[0];
                reply.setCookie('ST', token, {
                    domain,
                    path: '/',
                    secure: true,
                    httpOnly: true,
                    sameSite: 'lax',
                    signed: true,
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                });
                (0, replyHandler_1.default)(reply, {
                    status: 200,
                    details: 'Logged in successfully.',
                    data: {
                        user: {
                            id: user.id,
                            email: user.email,
                            role: user.role,
                            created_at: user.created_at,
                        },
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
    logout(request, reply) {
        try {
            reply.clearCookie('ST');
            (0, replyHandler_1.default)(reply, {
                status: 200,
                details: 'Logged out successfully.',
                data: { message: 'Logged out successfully.' },
            });
        }
        catch (error) {
            (0, replyHandler_1.default)(reply, {
                status: 500,
                details: 'Something went wrong, please try again later.',
                error: { message: 'Something went wrong, please try again later.' },
            });
        }
    }
    confirm(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.user;
                const userConfirmed = yield userRepository.updateById(id, { confirmed_at: new Date() });
                if (!userConfirmed) {
                    (0, replyHandler_1.default)(reply, {
                        status: 500,
                        details: 'Something went wrong, please try again later.',
                        error: { message: 'Something went wrong, please try again later.' },
                    });
                    return;
                }
                (0, replyHandler_1.default)(reply, {
                    status: 200,
                    details: 'Confirmation submitted.',
                    data: { message: 'Confirmation submitted.' },
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
    me(request, reply) {
        const user = request.user;
        if (!user) {
            (0, replyHandler_1.default)(reply, {
                status: 500,
                details: 'Something went wrong, please try again later.',
                error: { message: 'Something went wrong, please try again later.' },
            });
            return;
        }
        (0, replyHandler_1.default)(reply, {
            status: 200,
            details: 'Fetched current user successfully.',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    created_at: user.created_at,
                },
            },
        });
    }
}
exports.default = AuthService;

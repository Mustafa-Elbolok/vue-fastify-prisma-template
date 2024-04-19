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
class AuthorizationHook {
    confirm(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(request === null || request === void 0 ? void 0 : request.cookies['confirmation']) || (request === null || request === void 0 ? void 0 : request.cookies['confirmation']) != 'confirmed') {
                    (0, replyHandler_1.default)(reply, {
                        status: 404,
                        details: 'Invalid confirmation',
                        error: {
                            message: 'No action confirmation',
                            code: 'INVALID_CONFIRMATION',
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

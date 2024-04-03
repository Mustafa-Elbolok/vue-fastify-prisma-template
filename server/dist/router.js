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
const fs_1 = require("fs");
const auth_routes_1 = __importDefault(require("./@rest/auth/auth.routes"));
const api_routes_1 = __importDefault(require("./api.routes"));
const errorHundler_1 = __importDefault(require("./helpers/errorHundler"));
const getAssetType_1 = __importDefault(require("./helpers/getAssetType"));
function publicFilesHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = './src/public/' + request.url;
        if ((0, fs_1.existsSync)(path)) {
            const fileContent = (0, fs_1.readFileSync)(path);
            reply.type((0, getAssetType_1.default)(path)).send(fileContent);
        }
        else {
            const path = './src/public/index.html';
            const fileContent = (0, fs_1.readFileSync)(path, 'utf-8');
            reply.type('text/html').send(fileContent);
        }
    });
}
function initRouter(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.decorateRequest('initRouter', '');
        app.setErrorHandler(errorHundler_1.default);
        app.register(auth_routes_1.default, { prefix: '/' });
        app.register(api_routes_1.default, { prefix: '/api' });
        app.get('/assets/*', publicFilesHandler);
        app.get('/images/*', publicFilesHandler);
        app.get('/storage/*', publicFilesHandler);
    });
}
exports.default = initRouter;

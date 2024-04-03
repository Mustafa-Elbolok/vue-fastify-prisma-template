"use strict";
/** @format */
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _App_app;
Object.defineProperty(exports, "__esModule", { value: true });
const formbody_1 = __importDefault(require("@fastify/formbody"));
const cors_1 = __importDefault(require("@fastify/cors"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const middie_1 = __importDefault(require("@fastify/middie"));
const pino_1 = __importDefault(require("pino"));
const fastify_1 = __importDefault(require("fastify"));
const router_1 = __importDefault(require("./router"));
const fastify_file_upload_1 = __importDefault(require("fastify-file-upload"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const path_1 = __importDefault(require("path"));
const static_1 = __importDefault(require("@fastify/static"));
const isAllowedOrigin_1 = __importDefault(require("./helpers/isAllowedOrigin"));
const fs_1 = require("fs");
const appOptions = {};
appOptions.logger = (0, pino_1.default)({ level: 'trace' });
class App {
    constructor() {
        _App_app.set(this, void 0);
        //@ts-ignore
        __classPrivateFieldSet(this, _App_app, (0, fastify_1.default)(Object.assign({ 
            //@ts-ignore
            https: {
                key: (0, fs_1.readFileSync)('./localhost+1-key.pem'),
                cert: (0, fs_1.readFileSync)('./localhost+1.pem'),
            } }, appOptions)).withTypeProvider(), "f");
    }
    get app() {
        return __classPrivateFieldGet(this, _App_app, "f");
    }
    setup(app) {
        app.register(middie_1.default);
        app.register(formbody_1.default);
        app.register(fastify_file_upload_1.default);
        app.register(multipart_1.default);
        app.register(static_1.default, {
            root: path_1.default.join(path_1.default.dirname('/'), '/src/public'),
        });
        app.register(cors_1.default, {
            origin: (origin, cb) => cb(null, (0, isAllowedOrigin_1.default)(origin !== null && origin !== void 0 ? origin : '')),
            credentials: true,
        });
        app.register(jwt_1.default, {
            secret: process.env.JWT_SECRET,
            cookie: {
                cookieName: 'ST',
                signed: true,
            },
        });
        app.register(cookie_1.default, {
            secret: process.env.COOKIE_SECRET,
            hook: 'onRequest',
            parseOptions: {},
        });
        app.register(helmet_1.default, {
            contentSecurityPolicy: {
                directives: {
                    'img-src': ["'self'", 'data:', 'blob:'],
                },
            },
        });
        app.register(router_1.default);
        app.setNotFoundHandler((request, reply) => {
            const path = './src/public/index.html';
            const fileContent = (0, fs_1.readFileSync)(path, 'utf-8');
            reply.type('text/html').send(fileContent);
        });
    }
}
_App_app = new WeakMap();
exports.default = App;

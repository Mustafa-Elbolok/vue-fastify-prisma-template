/** @format */

import fastifyFormbody from '@fastify/formbody';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastifyMiddie from '@fastify/middie';
import pino, { Logger } from 'pino';
import fastify, {
    FastifyHttpOptions,
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
    FastifySchema,
    RawServerDefault,
    RouteGenericInterface,
} from 'fastify';

import { IncomingMessage, ServerResponse } from 'http';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import initRouter from './router';
import fastifyFileUpload from 'fastify-file-upload';
import fastifyMultipart from '@fastify/multipart';
import path from 'path';
import fastifyStatic from '@fastify/static';
import isAllowedOrigin from './helpers/isAllowedOrigin';
import { existsSync, fsync, readdirSync, readFileSync, readSync } from 'fs';
import { fileURLToPath } from 'url';
import getAssetType from './helpers/getAssetType';

export type Fastify = FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    Logger,
    TypeBoxTypeProvider
>;

export type Request<T extends FastifySchema = FastifySchema> = FastifyRequest<
    RouteGenericInterface,
    RawServerDefault,
    IncomingMessage,
    T,
    TypeBoxTypeProvider
>;

export type Reply = FastifyReply;

const appOptions: FastifyHttpOptions<RawServerDefault, Logger> = {};

if (process.env.NODE_ENV == 'production') appOptions.logger = pino({ level: 'trace' });

class App {
    #app: Fastify;
    constructor() {
        this.#app = fastify(appOptions).withTypeProvider<TypeBoxTypeProvider>();
    }
    get app() {
        return this.#app;
    }

    setup(app: Fastify) {
        app.register(fastifyMiddie);
        app.register(fastifyFormbody);
        app.register(fastifyFileUpload);
        app.register(fastifyMultipart);
        app.register(fastifyStatic, {
            root: path.join(path.dirname('/'), '/src/public'),
            prefix: '/public/',
        });
        app.register(fastifyCors, {
            origin: (origin, cb) => cb(null, isAllowedOrigin(origin ?? '')),
            credentials: true,
        });
        app.register(fastifyJwt, {
            secret: process.env.JWT_SECRET as string,
            cookie: {
                cookieName: 'ST',
                signed: true,
            },
        });
        app.register(fastifyCookie, {
            secret: process.env.COOKIE_SECRET,
            hook: 'onRequest',
            parseOptions: {},
        });
        app.register(fastifyHelmet);
        app.register(initRouter);

        app.get('*', async (request, reply) => {
            const path = './src/public/' + request.url;
            if (existsSync(path)) {
                const fileContent = readFileSync(path);
                reply.type(getAssetType(path)).send(fileContent);
            } else {
                const path = './src/public/index.html';
                const fileContent = readFileSync(path, 'utf-8');
                reply.type('text/html').send(fileContent);
            }
        });

        app.setNotFoundHandler((request, reply) => {
            const path = './src/public/index.html';
            const fileContent = readFileSync(path, 'utf-8');
            reply.type('text/html').send(fileContent);
        });
    }
}

export default App;

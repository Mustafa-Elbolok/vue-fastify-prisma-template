/** @format */

import fastifyFormbody from '@fastify/formbody';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyCookie from '@fastify/cookie';
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
import { readFileSync } from 'fs';

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

appOptions.logger = pino({ level: 'trace' });

class App {
    #app: Fastify;
    constructor() {
        //@ts-ignore
        this.#app = fastify({
            //@ts-ignore
            https: {
                key: readFileSync('./localhost+1-key.pem'),
                cert: readFileSync('./localhost+1.pem'),
            },
            ...appOptions,
        }).withTypeProvider<TypeBoxTypeProvider>();
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
        });
        app.register(fastifyCors, {
            origin: (origin, cb) => cb(null, isAllowedOrigin(origin ?? '')),
            credentials: true,
        });
        app.register(fastifyCookie, {
            secret: process.env.COOKIE_SECRET,
            hook: 'onRequest',
            parseOptions: {},
        });
        app.register(fastifyHelmet, {
            contentSecurityPolicy: {
                directives: {
                    'img-src': ["'self'", 'data:', 'blob:'],
                },
            },
        });
        app.register(initRouter);

        app.setNotFoundHandler((request, reply) => {
            const path = './src/public/index.html';
            const fileContent = readFileSync(path, 'utf-8');
            reply.type('text/html').send(fileContent);
        });
    }
}

export default App;

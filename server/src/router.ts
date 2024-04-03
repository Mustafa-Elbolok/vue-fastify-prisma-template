/** @format */

import { existsSync, readFileSync } from 'fs';
import authRouter from './@rest/auth/auth.routes';
import apiRouter from './api.routes';
import { Fastify, Reply, Request } from './app';
import errorHundler from './helpers/errorHundler';
import getAssetType from './helpers/getAssetType';

async function publicFilesHandler(request: Request, reply: Reply) {
    const path = './src/public/' + request.url;
    if (existsSync(path)) {
        const fileContent = readFileSync(path);
        reply.type(getAssetType(path)).send(fileContent);
    } else {
        const path = './src/public/index.html';
        const fileContent = readFileSync(path, 'utf-8');
        reply.type('text/html').send(fileContent);
    }
}

async function initRouter(app: Fastify) {
    app.decorateRequest('initRouter', '');
    app.setErrorHandler(errorHundler);

    app.register(authRouter, { prefix: '/' });
    app.register(apiRouter, { prefix: '/api' });

    app.get('/assets/*', publicFilesHandler);
    app.get('/images/*', publicFilesHandler);
    app.get('/storage/*', publicFilesHandler);
}

export default initRouter;

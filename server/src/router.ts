/** @format */

import authRouter from './@rest/auth/auth.routes';
import apiRouter from './api.routes';
import { Fastify } from './app';
import errorHundler from './helpers/errorHundler';

async function initRouter(app: Fastify) {
    app.decorateRequest('initRouter', '');
    app.setErrorHandler(errorHundler);

    app.register(authRouter, { prefix: '/' });
    app.register(apiRouter, { prefix: '/api' });
}

export default initRouter;

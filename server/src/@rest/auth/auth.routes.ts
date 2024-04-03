/** @format */

import AuthService from './auth.service';
import { Fastify } from '../../app';
import schema from './auth.schema';
import AuthorizationHook from '../../hooks/authorization';

const service = new AuthService();
const authorization = new AuthorizationHook();

async function authRouter(app: Fastify) {
    app.decorateRequest('authRouter', '');

    app.post('/login', { schema: schema.login }, service.login);

    app.post(
        '/confirm',
        {
            onRequest: authorization.verify,
        },
        service.confirm,
    );

    app.get(
        '/me',
        {
            onRequest: authorization.verify,
        },
        service.me,
    );

    app.delete(
        '/logout',
        {
            onRequest: authorization.verify,
        },
        service.logout,
    );
}

export default authRouter;

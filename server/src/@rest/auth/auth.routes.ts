/** @format */

import AuthService from './auth.service';
import { Fastify } from '../../app';
import AuthorizationHook from '../../hooks/authorization';

const service = new AuthService();
const authorization = new AuthorizationHook();

async function authRouter(app: Fastify) {
    app.decorateRequest('authRouter', '');
    app.post('/confirm', service.confirm);
}

export default authRouter;

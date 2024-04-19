/** @format */

import { Reply, Request } from '../../app';
import replyHandler from '../../helpers/replyHandler';
export default class AuthService {
    async confirm(request: Request, reply: Reply) {
        try {
            const domain = request.headers.origin?.split('://')[1].split(':')[0];
            reply.setCookie('confirmation', 'confirmed', {
                domain,
                path: '/',
                secure: true,
                httpOnly: true,
                sameSite: 'lax',
                signed: true,
                expires: new Date(Date.now() + 24 * 5 * 60 * 1000),
            });
            replyHandler(reply, {
                status: 200,
                details: 'Action confirmed.',
                data: {
                    message: 'Action confirmed.',
                },
            });
        } catch (error) {
            replyHandler(reply, {
                status: 500,
                details: 'Something went wrong, please try again later.',
                error: { message: 'Something went wrong, please try again later.' },
            });
        }
    }
}

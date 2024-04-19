/** @format */

import { Reply, Request } from '../app';
import resHandler from '../helpers/replyHandler';

export default class AuthorizationHook {
    async confirm(request: Request, reply: Reply) {
        try {
            if (!request?.cookies['confirmation'] || request?.cookies['confirmation'] != 'confirmed') {
                resHandler(reply, {
                    status: 404,
                    details: 'Invalid confirmation',
                    error: {
                        message: 'No action confirmation',
                        code: 'INVALID_CONFIRMATION',
                    },
                });

                return;
            }
        } catch (error) {
            resHandler(reply, {
                status: 500,
                details: 'Invalid confirmation',
                error: {
                    message: 'Not authorized',
                    code: 'INVALID_CONFIRMATION',
                },
            });
        }
    }
}

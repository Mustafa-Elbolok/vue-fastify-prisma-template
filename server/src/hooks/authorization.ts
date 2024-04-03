/** @format */

import { JwtPayload } from 'jsonwebtoken';
import { Reply, Request } from '../app';
import resHandler from '../helpers/replyHandler';
import UserRepository from '../repositories/User.repository';
import { User } from '@prisma/client';

const userRepository = new UserRepository();
export default class AuthorizationHook {
    async verify(request: Request, reply: Reply) {
        try {
            if (!request.cookies['ST']) {
                resHandler(reply, {
                    status: 401,
                    details: 'Token not found',
                    error: {
                        message: 'Not authorized',
                        code: 'NO_TOKEN',
                    },
                });

                return;
            }
            await request.jwtVerify();
            const { secret } = (await request.jwtDecode()) as JwtPayload;
            const user = await userRepository.findByKey({ key: 'id', value: secret });
            if (!user) {
                resHandler(reply, {
                    status: 500,
                    details: 'Invalid token',
                    error: {
                        message: 'Not authorized',
                        code: 'INVALID_TOKEN',
                    },
                });

                return;
            }
            request.user = user;
        } catch (error) {
            resHandler(reply, {
                status: 500,
                details: 'Invalid token',
                error: {
                    message: 'Not authorized',
                    code: 'INVALID_TOKEN',
                },
            });
        }
    }
    async confirm(request: Request, reply: Reply) {
        try {
            const user = request.user as User;
            const confirmedSince = new Date().getTime() - user.confirmed_at.getTime();

            // 5mins ago
            if (confirmedSince > 300000) {
                resHandler(reply, {
                    status: 401,
                    details: 'You need to confirm before doing this action',
                    error: {
                        message: 'No Confirmation',
                        code: 'NO_CONFIRMATION',
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

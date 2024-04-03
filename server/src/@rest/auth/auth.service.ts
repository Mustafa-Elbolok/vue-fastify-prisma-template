/** @format */

import { Reply, Request } from '../../app';
import replyHandler from '../../helpers/replyHandler';
import { AuthSchema } from './auth.schema';
import UserRepository from '../../repositories/User.repository';
import hasher from '../../helpers/hasher';
import { app } from '../..';
import { User } from '@prisma/client';

const userRepository = new UserRepository();
export default class AuthService {
    async login(request: Request<AuthSchema['login']>, reply: Reply) {
        const { email, password } = request.body;
        try {
            const user = await userRepository.findByKey({ key: 'email', value: email });
            if (!user) {
                replyHandler(reply, {
                    status: 404,
                    details: 'Invalid credentials.',
                    error: { message: 'Invalid credentials.' },
                });

                return;
            }
            if (!hasher.test(password, user?.password)) {
                replyHandler(reply, {
                    status: 404,
                    details: 'Invalid credentials.',
                    error: { message: 'Invalid credentials.' },
                });

                return;
            }
            const token = app.jwt.sign({ secret: user.id }, { expiresIn: '1d' });
            const domain = request.headers.origin?.split('://')[1].split(':')[0];
            reply.setCookie('ST', token, {
                domain,
                path: '/',
                secure: true,
                httpOnly: true,
                sameSite: 'lax',
                signed: true,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            });
            replyHandler(reply, {
                status: 200,
                details: 'Logged in successfully.',
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                        created_at: user.created_at,
                    } satisfies Partial<User>,
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

    logout(request: Request, reply: Reply) {
        try {
            reply.clearCookie('ST');
            replyHandler(reply, {
                status: 200,
                details: 'Logged out successfully.',
                data: { message: 'Logged out successfully.' },
            });
        } catch (error) {
            replyHandler(reply, {
                status: 500,
                details: 'Something went wrong, please try again later.',
                error: { message: 'Something went wrong, please try again later.' },
            });
        }
    }

    async confirm(request: Request, reply: Reply) {
        try {
            const { id } = request.user as User;
            const userConfirmed = await userRepository.updateById(id, { confirmed_at: new Date() });

            if (!userConfirmed) {
                replyHandler(reply, {
                    status: 500,
                    details: 'Something went wrong, please try again later.',
                    error: { message: 'Something went wrong, please try again later.' },
                });

                return;
            }
            replyHandler(reply, {
                status: 200,
                details: 'Confirmation submitted.',
                data: { message: 'Confirmation submitted.' },
            });
        } catch (error) {
            replyHandler(reply, {
                status: 500,
                details: 'Something went wrong, please try again later.',
                error: { message: 'Something went wrong, please try again later.' },
            });
        }
    }

    me(request: Request, reply: Reply) {
        const user = request.user as User;
        if (!user) {
            replyHandler(reply, {
                status: 500,
                details: 'Something went wrong, please try again later.',
                error: { message: 'Something went wrong, please try again later.' },
            });

            return;
        }
        replyHandler(reply, {
            status: 200,
            details: 'Fetched current user successfully.',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    created_at: user.created_at,
                } satisfies Partial<User>,
            },
        });
    }
}

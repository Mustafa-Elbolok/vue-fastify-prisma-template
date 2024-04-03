/** @format */

import request, { Test } from 'supertest';
import { app } from '../..';
import { users } from '../../dummy.test.json';
import TestAgent from 'supertest/lib/agent';

export const authenticate = (agent: TestAgent<Test>) => agent.post('/login').send(users.admin);

describe('Test authentication', () => {
    let agent: TestAgent;
    beforeAll(async () => {
        return app.ready().then(async () => {
            agent = request.agent(app.server);
            return agent;
        });
    });

    test('Test login as admin', () => {
        return authenticate(agent).then(async (response) => {
            const result = JSON.parse(response.text);
            expect(result.details).toBe('Logged in successfully.');
        });
    });

    test('Test login as unregistered user', () => {
        return agent
            .post('/login')
            .send({ email: 'user@banned.com', password: 'new-user-password' })
            .then(async (response) => {
                const result = JSON.parse(response.text);
                expect(result.details).toBe('Invalid credentials.');
            });
    });

    test('Test login without email', () => {
        return agent
            .post('/login')
            .send({ password: 'new-user-password' })
            .then(async (response) => {
                const result = JSON.parse(response.text);
                expect(result.message).toBe("must have required property 'email'");
            });
    });

    test('Test login without password', () => {
        return agent
            .post('/login')
            .send({ email: 'user@banned.com' })
            .then(async (response) => {
                const result = JSON.parse(response.text);
                expect(result.message).toBe("must have required property 'password'");
            });
    });

    test('Test login with invalid email', () => {
        return agent
            .post('/login')
            .send({ email: 'userbanned.com', password: 'new-user-password' })
            .then(async (response) => {
                const result = JSON.parse(response.text);
                expect(result.message).toBe('email must match format "email"');
            });
    });

    test('Test login with short password', () => {
        return agent
            .post('/login')
            .send({ email: 'user@banned.com', password: 'new' })
            .then(async (response) => {
                const result = JSON.parse(response.text);
                expect(result.message).toBe('password must NOT have fewer than 8 characters');
            });
    });

    test('Test login with long password', () => {
        return agent
            .post('/login')
            .send({ email: 'user@banned.com', password: 'this-text-is-longer-than-32-character' })
            .then(async (response) => {
                const result = JSON.parse(response.text);
                expect(result.message).toBe('password must NOT have more than 32 characters');
            });
    });

    test('Test login with short email', () => {
        return agent
            .post('/login')
            .send({ email: 'e@m', password: 'good-password' })
            .then(async (response) => {
                const result = JSON.parse(response.text);
                expect(result.message).toBe('email must NOT have fewer than 5 characters');
            });
    });

    test('Test login with long email', () => {
        return agent
            .post('/login')
            .send({ email: 'email@this-text-is-much-longer-than-50-characters.com', password: 'good-password' })
            .then(async (response) => {
                const result = JSON.parse(response.text);
                expect(result.message).toBe('email must NOT have more than 50 characters');
            });
    });
});

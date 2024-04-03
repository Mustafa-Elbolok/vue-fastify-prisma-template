/** @format */

import request from 'supertest';
import { app } from '../..';
import { authenticate } from '../auth/auth.test';
import TestAgent from 'supertest/lib/agent';

describe('Test category apis', () => {
    let agent: TestAgent;
    beforeAll(async () => {
        return app.ready().then(async () => {
            agent = request.agent(app.server);
            const response = await authenticate(agent);
            agent.set('Cookie', response.headers['set-cookie']);
            return agent;
        });
    });

    test('Test getting all categories api', () => {
        return agent.get('/api/category/').then(async (response) => {
            expect(response.statusCode).toBe(200);
        });
    });
});

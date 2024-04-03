/** @format */

import { app } from '.';

export const listen = new Promise((resolve, reject) => {
    app.listen({ port: 3000, host: '0.0.0.0' }).then(resolve).catch(reject);
});

describe('Test hosting the application', () => {
    afterAll(async () => {
        await app.close();
    });

    test('It should response with hosted url', () => {
        const serving = new Promise((resolve, reject) => {
            app.listen({ port: 3000, host: '0.0.0.0' }).then(resolve).catch(reject);
        });
        return serving.then(() => {
            expect(serving).resolves;
        });
    });
});

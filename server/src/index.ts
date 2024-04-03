/** @format */

import dotenv from 'dotenv';
import App from './app';
dotenv.config();

const { app, setup } = new App();

async function bootstrap(port: number, host: string) {
    return new Promise((resolve, reject) => {
        app.listen({ port, host }).then(resolve).catch(reject);
    });
}

async function main() {
    try {
        const PORT = !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 5000;
        setup(app);
        await bootstrap(PORT, 'localhost');
        console.log(`🚀 Server is ready at ${process.env.HOST}:${PORT}`);
    } catch (err) {
        console.error('💀 Error starting the node server.\n', err);
    }
}

main();

export { app };

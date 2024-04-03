/** @format */

import categoriesRouter from './@rest/category/category.routes';
import productsRouter from './@rest/product/product.routes';
import { Fastify } from './app';

async function apiRouter(app: Fastify) {
    app.decorateRequest('apiRouter', '');

    app.register(categoriesRouter, { prefix: '/category' });
    app.register(productsRouter, { prefix: '/product' });
}

export default apiRouter;

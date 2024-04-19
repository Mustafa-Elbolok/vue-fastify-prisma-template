/** @format */

import { Fastify } from '../../app';
import schema from './product.schema';
import ProductService from './product.service';

const productService = new ProductService();

async function productsRouter(app: Fastify) {
    app.decorateRequest('productsRouter', '');

    app.get('/', { schema: schema.getAllProducts }, productService.getAllProducts);
    app.get('/:id', { schema: schema.getProductById }, productService.getProductById);

    app.register(productsActionsRouter);
}

async function productsActionsRouter(app: Fastify) {
    app.decorateRequest('productsActionsRouter', '');

    app.post('/', { schema: schema.createProduct }, productService.createProduct);
    app.put('/:id', { schema: schema.updateProduct }, productService.updateProduct);
    app.delete('/:id', { schema: schema.removeProduct }, productService.removeProduct);
}

export default productsRouter;

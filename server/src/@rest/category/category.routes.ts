/** @format */

import { Fastify } from '../../app';
import AuthorizationHook from '../../hooks/authorization';
import schema from './category.schema';
import CategoryService from './category.service';

const categoryService = new CategoryService();

async function categoriesRouter(app: Fastify) {
    app.decorateRequest('categoriesRouter', '');

    app.get('/', { schema: schema.getAllCategories }, categoryService.getAllCategories);
    app.get('/:id', { schema: schema.getCategoryById }, categoryService.getCategoryById);

    app.register(categoriesActionsRouter);
}

async function categoriesActionsRouter(app: Fastify) {
    app.decorateRequest('categoriesActionsRouter', '');

    const authorizationHook = new AuthorizationHook();

    app.addHook('onRequest', authorizationHook.verify);

    app.post('/', { schema: schema.createCategory }, categoryService.createCategory);
    app.put('/:id', { schema: schema.updateCategory }, categoryService.updateCategory);
    app.delete(
        '/:id',
        {
            schema: schema.removeCategory,
            onRequest: authorizationHook.confirm,
        },
        categoryService.removeCategory,
    );
}

export default categoriesRouter;

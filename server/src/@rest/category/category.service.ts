/** @format */

import { Reply, Request } from '../../app';
import replyHandler from '../../helpers/replyHandler';
import CategoryRepository from '../../repositories/Category.repository';
import ProductRepository from '../../repositories/Product.repository';
import { CategorySchema } from './category.schema';
import storage from '../../helpers/storage';
import { Category } from '@prisma/client';

export interface CategoryWithCount extends Partial<Category> {
    id: number;
    parent: string;
    subCategoriesCount: number;
    productsCount: number;
}

const categoryRepository = new CategoryRepository();
const productRepository = new ProductRepository();
export default class CategoryService {
    async getAllCategories(request: Request<CategorySchema['getAllCategories']>, reply: Reply) {
        const { page, limit, search, category } = request.query;

        try {
            const totalQueryResults = await categoryRepository.count({
                name: search,
                parent_id: category,
            });
            if (totalQueryResults == 0) {
                replyHandler(reply, {
                    status: 404,
                    details: search ? 'Categories not found.' : 'No categories.',
                    error: {
                        message: 'Categories not found.',
                        code: 'NO_CATEGORIES',
                    },
                });

                return;
            }

            const rawCategories = await categoryRepository.findAll(page, limit, {
                name: search,
                parent_id: category,
            });

            const categories: CategoryWithCount[] = [];
            const countedSubsData: { [key: string]: { subCategoriesCount: number; productsCount: number } } = {};
            for (const category of rawCategories) {
                const subData = countedSubsData[category.id ?? 0] ?? { subCategoriesCount: 0, productsCount: 0 };
                const categoryData = {
                    subCategoriesCount: subData.subCategoriesCount + (category.subCategories?.length ?? 0),
                    productsCount: subData.productsCount + (category.products.length ?? 0),
                };
                countedSubsData[category.parent_id ?? 0] = categoryData;
                categories.push({
                    id: category.id,
                    name: category.name,
                    parent: category?.category?.name ?? '',
                    picture: category.picture,
                    level: category.level,
                    created_at: category.created_at,
                    ...categoryData,
                });
            }
            const totalCategories = await categoryRepository.count();
            const totalProducts = await productRepository.count();
            replyHandler(reply, {
                status: 200,
                details: 'Fetched categories successfully.',
                pagination: {
                    page: page ?? 1,
                    limit: limit ?? 25,
                    total: totalQueryResults,
                },
                data: {
                    categories: categories.sort((a, b) => a?.id - b?.id),
                    totalCategories,
                    totalProducts,
                },
            });
        } catch (error) {
            replyHandler(reply, {
                status: 500,
                details: 'Something went wrong, try again later.',
                error: {
                    message: 'Couldn`t fetch categories.',
                    code: 'UNEXPECTED_ERROR',
                },
            });
        }
    }

    async getCategoryById(request: Request<CategorySchema['getCategoryById']>, reply: Reply) {
        const { id } = request.params;
        try {
            const category = await categoryRepository.findById(id);
            if (!category) {
                replyHandler(reply, {
                    status: 404,
                    details: 'Category not found.',
                    error: {
                        message: 'Category not found.',
                        code: 'NO_CATEGORY',
                    },
                });

                return;
            }
            replyHandler(reply, {
                status: 200,
                details: 'Fetched category successfully.',
                data: { category },
            });
        } catch (error) {
            replyHandler(reply, {
                status: 500,
                details: 'Something went wrong, try again later.',
                error: {
                    message: 'Couldn`t fetch category.',
                    code: 'UNEXPECTED_ERROR',
                },
            });
        }
    }

    async createCategory(request: Request<CategorySchema['createCategory']>, reply: Reply) {
        const data = request.body;
        let picturePath: string = '';
        try {
            const { picture }: any = data;
            if (picture) {
                picturePath = storage.add(picture.data, 'category', picture.name.split('.').at(-1));
            }
            const newCategory = await categoryRepository.Add({ ...data, picture: picturePath });
            if (!newCategory) {
                storage.remove(picturePath);
                replyHandler(reply, {
                    status: 400,
                    details: 'Couldn`t add category.',
                    error: {
                        message: 'Couldn`t add category.',
                        code: 'BAD_REQUEST',
                    },
                });

                return;
            }
            replyHandler(reply, {
                status: 201,
                details: 'Created category successfully.',
                data: { category: '' },
            });
        } catch (error) {
            if (picturePath) storage.remove(picturePath);
            replyHandler(reply, {
                status: 500,
                details: 'Something went wrong, try again later.',
                error: {
                    message: 'Couldn`t add category.',
                    code: 'UNEXPECTED_ERROR',
                },
            });
        }
    }

    async updateCategory(request: Request<CategorySchema['updateCategory']>, reply: Reply) {
        const data = request.body;
        const { id } = request.params;
        let picturePath: string = '';
        try {
            const category = await categoryRepository.findById(id);
            const { picture }: any = data;
            if (picture) {
                storage.remove(category?.picture ?? '');
                picturePath = storage.add(picture.data, 'category', picture.name.split('.').at(-1));
            }
            const updatedCategory = await categoryRepository.updateById(id, { ...data, picture: picturePath });
            if (!updatedCategory) {
                replyHandler(reply, {
                    status: 400,
                    details: 'Couldn`t update category.',
                    error: {
                        message: 'Couldn`t update category.',
                        code: 'BAD_REQUEST',
                    },
                });

                return;
            }
            replyHandler(reply, {
                status: 202,
                details: 'Updated category successfully.',
                data: { category: updatedCategory },
            });
        } catch (error) {
            replyHandler(reply, {
                status: 500,
                details: 'Something went wrong, try again later.',
                error: {
                    message: 'Couldn`t update category.',
                    code: 'UNEXPECTED_ERROR',
                },
            });
        }
    }

    async removeCategory(request: Request<CategorySchema['removeCategory']>, reply: Reply) {
        const { id } = request.params;
        try {
            const removedCategory = await categoryRepository.deleteById(id);
            if (!removedCategory) {
                replyHandler(reply, {
                    status: 400,
                    details: 'Couldn`t remove category.',
                    error: {
                        message: 'Couldn`t remove category.',
                        code: 'BAD_REQUEST',
                    },
                });

                return;
            }
            replyHandler(reply, {
                status: 202,
                details: 'Removed category successfully.',
                data: { category: removedCategory },
            });
        } catch (error) {
            replyHandler(reply, {
                status: 500,
                details: 'Something went wrong, try again later.',
                error: {
                    message: 'Couldn`t remove category.',
                    code: 'UNEXPECTED_ERROR',
                },
            });
        }
    }
}

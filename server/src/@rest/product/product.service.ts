/** @format */

import { Reply, Request } from '../../app';
import replyHandler from '../../helpers/replyHandler';
import storage from '../../helpers/storage';
import ProductRepository from '../../repositories/Product.repository';
import { ProductSchema } from './product.schema';

const productRepository = new ProductRepository();
export default class ProductService {
    async getAllProducts(request: Request<ProductSchema['getAllProducts']>, reply: Reply) {
        const { page, limit, search, category } = request.query;

        try {
            const totalQueryResults = await productRepository.count({ name: search, category_id: category });
            if (totalQueryResults == 0) {
                replyHandler(reply, {
                    status: 404,
                    details: search ? 'Products not found.' : 'No products.',
                    error: {
                        message: 'Products not found.',
                        code: 'NO_PRODUCTS',
                    },
                });

                return;
            }

            const products = await productRepository.findAll(page, limit, { name: search, category_id: category });
            replyHandler(reply, {
                status: 200,
                details: 'Fetched products successfully.',
                pagination: {
                    page: page ?? 1,
                    limit: limit ?? 25,
                    total: totalQueryResults,
                },
                data: { products },
            });
        } catch (error) {
            replyHandler(reply, {
                status: 500,
                details: 'Something went wrong, try again later.',
                error: {
                    message: 'Couldn`t fetch products.',
                    code: 'UNEXPECTED_ERROR',
                },
            });
        }
    }

    async getProductById(request: Request<ProductSchema['getProductById']>, reply: Reply) {
        const { id } = request.params;
        try {
            const product = await productRepository.findById(id);
            if (!product) {
                replyHandler(reply, {
                    status: 404,
                    details: 'Product not found.',
                    error: {
                        message: 'Product not found.',
                        code: 'NO_PRODUCT',
                    },
                });

                return;
            }
            replyHandler(reply, {
                status: 200,
                details: 'Fetched product successfully.',
                data: { product },
            });
        } catch (error) {
            replyHandler(reply, {
                status: 500,
                details: 'Something went wrong, try again later.',
                error: {
                    message: 'Couldn`t fetch product.',
                    code: 'UNEXPECTED_ERROR',
                },
            });
        }
    }

    async createProduct(request: Request<ProductSchema['createProduct']>, reply: Reply) {
        const data = request.body;
        let picturePath: string = '';
        try {
            const { picture }: any = data;
            if (picture) {
                picturePath = storage.add(picture.data, 'product', picture.name.split('.').at(-1));
            }
            const newProduct = await productRepository.Add({ ...data, picture: picturePath });
            if (!newProduct) {
                replyHandler(reply, {
                    status: 400,
                    details: 'Couldn`t add product.',
                    error: {
                        message: 'Couldn`t add product.',
                        code: 'BAD_REQUEST',
                    },
                });

                return;
            }
            replyHandler(reply, {
                status: 201,
                details: 'Created product successfully.',
                data: { product: newProduct },
            });
        } catch (error) {
            replyHandler(reply, {
                status: 500,
                details: 'Something went wrong, try again later.',
                error: {
                    message: 'Couldn`t add product.',
                    code: 'UNEXPECTED_ERROR',
                },
            });
        }
    }

    async updateProduct(request: Request<ProductSchema['updateProduct']>, reply: Reply) {
        const data = request.body;
        const { id } = request.params;
        let picturePath: string = '';
        try {
            const product = await productRepository.findById(id);
            const { picture }: any = data;
            if (picture) {
                storage.remove(product?.picture ?? '');
                picturePath = storage.add(picture.data, 'product', picture.name.split('.').at(-1));
            }
            const updatedProduct = await productRepository.updateById(id, { ...data, picture: picturePath });
            if (!updatedProduct) {
                replyHandler(reply, {
                    status: 400,
                    details: 'Couldn`t update product.',
                    error: {
                        message: 'Couldn`t update product.',
                        code: 'BAD_REQUEST',
                    },
                });

                return;
            }
            replyHandler(reply, {
                status: 202,
                details: 'Updated product successfully.',
                data: { product: updatedProduct },
            });
        } catch (error) {
            replyHandler(reply, {
                status: 500,
                details: 'Something went wrong, try again later.',
                error: {
                    message: 'Couldn`t update product.',
                    code: 'UNEXPECTED_ERROR',
                },
            });
        }
    }

    async removeProduct(request: Request<ProductSchema['removeProduct']>, reply: Reply) {
        const { id } = request.params;
        try {
            const removedProduct = await productRepository.deleteById(id);
            if (!removedProduct) {
                replyHandler(reply, {
                    status: 400,
                    details: 'Couldn`t remove product.',
                    error: {
                        message: 'Couldn`t remove product.',
                        code: 'BAD_REQUEST',
                    },
                });

                return;
            }
            replyHandler(reply, {
                status: 202,
                details: 'Removed product successfully.',
                data: { product: removedProduct },
            });
        } catch (error) {
            replyHandler(reply, {
                status: 500,
                details: 'Something went wrong, try again later.',
                error: {
                    message: 'Couldn`t remove product.',
                    code: 'UNEXPECTED_ERROR',
                },
            });
        }
    }
}

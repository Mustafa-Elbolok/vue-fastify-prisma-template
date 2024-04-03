"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const replyHandler_1 = __importDefault(require("../../helpers/replyHandler"));
const storage_1 = __importDefault(require("../../helpers/storage"));
const Product_repository_1 = __importDefault(require("../../repositories/Product.repository"));
const productRepository = new Product_repository_1.default();
class ProductService {
    getAllProducts(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit, search, category } = request.query;
            try {
                const totalQueryResults = yield productRepository.count({ name: search, category_id: category });
                if (totalQueryResults == 0) {
                    (0, replyHandler_1.default)(reply, {
                        status: 404,
                        details: search ? 'Products not found.' : 'No products.',
                        error: {
                            message: 'Products not found.',
                            code: 'NO_PRODUCTS',
                        },
                    });
                    return;
                }
                const products = yield productRepository.findAll(page, limit, { name: search, category_id: category });
                (0, replyHandler_1.default)(reply, {
                    status: 200,
                    details: 'Fetched products successfully.',
                    pagination: {
                        page: page !== null && page !== void 0 ? page : 1,
                        limit: limit !== null && limit !== void 0 ? limit : 25,
                        total: totalQueryResults,
                    },
                    data: { products },
                });
            }
            catch (error) {
                (0, replyHandler_1.default)(reply, {
                    status: 500,
                    details: 'Something went wrong, try again later.',
                    error: {
                        message: 'Couldn`t fetch products.',
                        code: 'UNEXPECTED_ERROR',
                    },
                });
            }
        });
    }
    getProductById(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            try {
                const product = yield productRepository.findById(id);
                if (!product) {
                    (0, replyHandler_1.default)(reply, {
                        status: 404,
                        details: 'Product not found.',
                        error: {
                            message: 'Product not found.',
                            code: 'NO_PRODUCT',
                        },
                    });
                    return;
                }
                (0, replyHandler_1.default)(reply, {
                    status: 200,
                    details: 'Fetched product successfully.',
                    data: { product },
                });
            }
            catch (error) {
                (0, replyHandler_1.default)(reply, {
                    status: 500,
                    details: 'Something went wrong, try again later.',
                    error: {
                        message: 'Couldn`t fetch product.',
                        code: 'UNEXPECTED_ERROR',
                    },
                });
            }
        });
    }
    createProduct(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = request.body;
            let picturePath = '';
            try {
                const { picture } = data;
                if (picture) {
                    picturePath = storage_1.default.add(picture.data, 'product', picture.name.split('.').at(-1));
                }
                const newProduct = yield productRepository.Add(Object.assign(Object.assign({}, data), { picture: picturePath }));
                if (!newProduct) {
                    (0, replyHandler_1.default)(reply, {
                        status: 400,
                        details: 'Couldn`t add product.',
                        error: {
                            message: 'Couldn`t add product.',
                            code: 'BAD_REQUEST',
                        },
                    });
                    return;
                }
                (0, replyHandler_1.default)(reply, {
                    status: 201,
                    details: 'Created product successfully.',
                    data: { product: newProduct },
                });
            }
            catch (error) {
                (0, replyHandler_1.default)(reply, {
                    status: 500,
                    details: 'Something went wrong, try again later.',
                    error: {
                        message: 'Couldn`t add product.',
                        code: 'UNEXPECTED_ERROR',
                    },
                });
            }
        });
    }
    updateProduct(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const data = request.body;
            const { id } = request.params;
            let picturePath = '';
            try {
                const product = yield productRepository.findById(id);
                const { picture } = data;
                if (picture) {
                    storage_1.default.remove((_a = product === null || product === void 0 ? void 0 : product.picture) !== null && _a !== void 0 ? _a : '');
                    picturePath = storage_1.default.add(picture.data, 'product', picture.name.split('.').at(-1));
                }
                const updatedProduct = yield productRepository.updateById(id, Object.assign(Object.assign({}, data), { picture: picturePath }));
                if (!updatedProduct) {
                    (0, replyHandler_1.default)(reply, {
                        status: 400,
                        details: 'Couldn`t update product.',
                        error: {
                            message: 'Couldn`t update product.',
                            code: 'BAD_REQUEST',
                        },
                    });
                    return;
                }
                (0, replyHandler_1.default)(reply, {
                    status: 202,
                    details: 'Updated product successfully.',
                    data: { product: updatedProduct },
                });
            }
            catch (error) {
                (0, replyHandler_1.default)(reply, {
                    status: 500,
                    details: 'Something went wrong, try again later.',
                    error: {
                        message: 'Couldn`t update product.',
                        code: 'UNEXPECTED_ERROR',
                    },
                });
            }
        });
    }
    removeProduct(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            try {
                const removedProduct = yield productRepository.deleteById(id);
                if (!removedProduct) {
                    (0, replyHandler_1.default)(reply, {
                        status: 400,
                        details: 'Couldn`t remove product.',
                        error: {
                            message: 'Couldn`t remove product.',
                            code: 'BAD_REQUEST',
                        },
                    });
                    return;
                }
                (0, replyHandler_1.default)(reply, {
                    status: 202,
                    details: 'Removed product successfully.',
                    data: { product: removedProduct },
                });
            }
            catch (error) {
                (0, replyHandler_1.default)(reply, {
                    status: 500,
                    details: 'Something went wrong, try again later.',
                    error: {
                        message: 'Couldn`t remove product.',
                        code: 'UNEXPECTED_ERROR',
                    },
                });
            }
        });
    }
}
exports.default = ProductService;

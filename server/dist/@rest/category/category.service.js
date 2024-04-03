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
const Category_repository_1 = __importDefault(require("../../repositories/Category.repository"));
const Product_repository_1 = __importDefault(require("../../repositories/Product.repository"));
const storage_1 = __importDefault(require("../../helpers/storage"));
const categoryRepository = new Category_repository_1.default();
const productRepository = new Product_repository_1.default();
class CategoryService {
    getAllCategories(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const { page, limit, search, category } = request.query;
            try {
                const totalQueryResults = yield categoryRepository.count({
                    name: search,
                    parent_id: category,
                });
                if (totalQueryResults == 0) {
                    (0, replyHandler_1.default)(reply, {
                        status: 404,
                        details: search ? 'Categories not found.' : 'No categories.',
                        error: {
                            message: 'Categories not found.',
                            code: 'NO_CATEGORIES',
                        },
                    });
                    return;
                }
                const rawCategories = yield categoryRepository.findAll(page, limit, {
                    name: search,
                    parent_id: category,
                });
                const categories = [];
                const countedSubsData = {};
                for (const category of rawCategories) {
                    const subData = (_b = countedSubsData[(_a = category.id) !== null && _a !== void 0 ? _a : 0]) !== null && _b !== void 0 ? _b : { subCategoriesCount: 0, productsCount: 0 };
                    const categoryData = {
                        subCategoriesCount: subData.subCategoriesCount + ((_d = (_c = category.subCategories) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0),
                        productsCount: subData.productsCount + ((_e = category.products.length) !== null && _e !== void 0 ? _e : 0),
                    };
                    countedSubsData[(_f = category.parent_id) !== null && _f !== void 0 ? _f : 0] = categoryData;
                    categories.push(Object.assign({ id: category.id, name: category.name, parent: (_h = (_g = category === null || category === void 0 ? void 0 : category.category) === null || _g === void 0 ? void 0 : _g.name) !== null && _h !== void 0 ? _h : '', picture: category.picture, level: category.level, created_at: category.created_at }, categoryData));
                }
                const totalCategories = yield categoryRepository.count();
                const totalProducts = yield productRepository.count();
                (0, replyHandler_1.default)(reply, {
                    status: 200,
                    details: 'Fetched categories successfully.',
                    pagination: {
                        page: page !== null && page !== void 0 ? page : 1,
                        limit: limit !== null && limit !== void 0 ? limit : 25,
                        total: totalQueryResults,
                    },
                    data: {
                        categories: categories.sort((a, b) => (a === null || a === void 0 ? void 0 : a.id) - (b === null || b === void 0 ? void 0 : b.id)),
                        totalCategories,
                        totalProducts,
                    },
                });
            }
            catch (error) {
                (0, replyHandler_1.default)(reply, {
                    status: 500,
                    details: 'Something went wrong, try again later.',
                    error: {
                        message: 'Couldn`t fetch categories.',
                        code: 'UNEXPECTED_ERROR',
                    },
                });
            }
        });
    }
    getCategoryById(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            try {
                const category = yield categoryRepository.findById(id);
                if (!category) {
                    (0, replyHandler_1.default)(reply, {
                        status: 404,
                        details: 'Category not found.',
                        error: {
                            message: 'Category not found.',
                            code: 'NO_CATEGORY',
                        },
                    });
                    return;
                }
                (0, replyHandler_1.default)(reply, {
                    status: 200,
                    details: 'Fetched category successfully.',
                    data: { category },
                });
            }
            catch (error) {
                (0, replyHandler_1.default)(reply, {
                    status: 500,
                    details: 'Something went wrong, try again later.',
                    error: {
                        message: 'Couldn`t fetch category.',
                        code: 'UNEXPECTED_ERROR',
                    },
                });
            }
        });
    }
    createCategory(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = request.body;
            let picturePath = '';
            try {
                const { picture } = data;
                if (picture) {
                    picturePath = storage_1.default.add(picture.data, 'category', picture.name.split('.').at(-1));
                }
                const newCategory = yield categoryRepository.Add(Object.assign(Object.assign({}, data), { picture: picturePath }));
                if (!newCategory) {
                    storage_1.default.remove(picturePath);
                    (0, replyHandler_1.default)(reply, {
                        status: 400,
                        details: 'Couldn`t add category.',
                        error: {
                            message: 'Couldn`t add category.',
                            code: 'BAD_REQUEST',
                        },
                    });
                    return;
                }
                (0, replyHandler_1.default)(reply, {
                    status: 201,
                    details: 'Created category successfully.',
                    data: { category: '' },
                });
            }
            catch (error) {
                if (picturePath)
                    storage_1.default.remove(picturePath);
                (0, replyHandler_1.default)(reply, {
                    status: 500,
                    details: 'Something went wrong, try again later.',
                    error: {
                        message: 'Couldn`t add category.',
                        code: 'UNEXPECTED_ERROR',
                    },
                });
            }
        });
    }
    updateCategory(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const data = request.body;
            const { id } = request.params;
            let picturePath = '';
            try {
                const category = yield categoryRepository.findById(id);
                const { picture } = data;
                if (picture) {
                    storage_1.default.remove((_a = category === null || category === void 0 ? void 0 : category.picture) !== null && _a !== void 0 ? _a : '');
                    picturePath = storage_1.default.add(picture.data, 'category', picture.name.split('.').at(-1));
                }
                const updatedCategory = yield categoryRepository.updateById(id, Object.assign(Object.assign({}, data), { picture: picturePath }));
                if (!updatedCategory) {
                    (0, replyHandler_1.default)(reply, {
                        status: 400,
                        details: 'Couldn`t update category.',
                        error: {
                            message: 'Couldn`t update category.',
                            code: 'BAD_REQUEST',
                        },
                    });
                    return;
                }
                (0, replyHandler_1.default)(reply, {
                    status: 202,
                    details: 'Updated category successfully.',
                    data: { category: updatedCategory },
                });
            }
            catch (error) {
                (0, replyHandler_1.default)(reply, {
                    status: 500,
                    details: 'Something went wrong, try again later.',
                    error: {
                        message: 'Couldn`t update category.',
                        code: 'UNEXPECTED_ERROR',
                    },
                });
            }
        });
    }
    removeCategory(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            try {
                const removedCategory = yield categoryRepository.deleteById(id);
                if (!removedCategory) {
                    (0, replyHandler_1.default)(reply, {
                        status: 400,
                        details: 'Couldn`t remove category.',
                        error: {
                            message: 'Couldn`t remove category.',
                            code: 'BAD_REQUEST',
                        },
                    });
                    return;
                }
                (0, replyHandler_1.default)(reply, {
                    status: 202,
                    details: 'Removed category successfully.',
                    data: { category: removedCategory },
                });
            }
            catch (error) {
                (0, replyHandler_1.default)(reply, {
                    status: 500,
                    details: 'Something went wrong, try again later.',
                    error: {
                        message: 'Couldn`t remove category.',
                        code: 'UNEXPECTED_ERROR',
                    },
                });
            }
        });
    }
}
exports.default = CategoryService;

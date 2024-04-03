"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const productsReducer = (products) => products.reduce((acc, product) => (acc = [...acc, product.picture]), []);
const subCategoriesReducer = (categories) => categories
    ? categories.reduce((acc, category) => (acc = [
        ...acc,
        ...productsReducer(category.products),
        category.picture,
        ...subCategoriesReducer(category === null || category === void 0 ? void 0 : category.subCategories),
    ]), [])
    : [];
function picturesReducer(categories) {
    return categories.reduce((acc, category) => (acc = [
        ...acc,
        category.picture,
        ...productsReducer(category.products),
        ...subCategoriesReducer(category.subCategories),
    ]), []);
}
exports.default = picturesReducer;

/** @format */

type Products = { picture: string }[];
type SubCategories = { picture: string; products: Products; subCategories?: SubCategories }[];
type Category = {
    picture: string;
    products: Products;
    subCategories: SubCategories;
};

const productsReducer = (products: Products) =>
    products.reduce((acc, product) => (acc = [...acc, product.picture]), [] as string[]);

const subCategoriesReducer: (categories?: SubCategories) => string[] = (categories?: SubCategories) =>
    categories
        ? categories.reduce(
              (acc, category) =>
                  (acc = [
                      ...acc,
                      ...productsReducer(category.products),
                      category.picture,
                      ...subCategoriesReducer(category?.subCategories),
                  ]),
              [] as string[],
          )
        : [];

export default function picturesReducer(categories: Category[]) {
    return categories.reduce(
        (acc, category) =>
            (acc = [
                ...acc,
                category.picture,
                ...productsReducer(category.products),
                ...subCategoriesReducer(category.subCategories),
            ]),
        [] as string[],
    );
}

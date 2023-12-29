import { host } from "./host";

export const getAllProducts = `${host}/api/products/get_products`;

export const getProductInfo = `${host}/api/products`;

export const uploadImageRoute = `${host}/api/upload`;

export const createProductRoute = `${host}/api/products/create`;

export const getUniqueCategoriesRoute = `${host}/api/products/unique_cat`;

export const getUniqueBrandsRoute = `${host}/api/products/unique_brand`;

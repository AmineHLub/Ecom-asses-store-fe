import instance from "./apiInstance";
import type { Product } from "../types/Product.type";

export type ProductsResponse = {
  data: Product[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }
};

let productCache: ProductsResponse | null = null;

export async function getProductsResource({page = 1, limit = 10, search = '', category = ''}): Promise<ProductsResponse> {
  if (productCache) {
    return productCache;
  }

  const result = await instance.get<ProductsResponse>('/products', {
    params: {
      page,
      per_page: limit,
      search,
      category
    }
  });
  productCache = result.data;
  return result.data;
}

export function clearProductsCache() {
  productCache = null;
}

const singleProductCache = new Map<number, Promise<Product | null>>();

export async function getProductById(productId: number): Promise<Product | null> {
  if (singleProductCache.has(productId)) {
    return singleProductCache.get(productId)!;
  }

  const productPromise = instance.get<Product>(`/products/${productId}`)
    .then(response => response.data)
    .catch(() => null);
  console.log('Fetching product with ID:', productId, productPromise);
  singleProductCache.set(productId, productPromise);
  return productPromise;
}
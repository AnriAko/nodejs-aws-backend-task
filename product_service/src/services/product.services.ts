import { Product } from "../types/product.types";
import { products as mockProducts } from "../mockData";

export class ProductService {
    private products: Product[] = mockProducts;

    getAllProducts(): Product[] {
        return this.products;
    }

    getProductById(id: string): Product | undefined {
        return this.products.find((product) => product.id === id);
    }
}

export const productService = new ProductService();

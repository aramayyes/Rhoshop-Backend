
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Category {
    id: string;
    name: string;
    image: string;
}

export abstract class IQuery {
    abstract categories(language?: string): Category[] | Promise<Category[]>;

    abstract products(language?: string): Product[] | Promise<Product[]>;
}

export class Product {
    id: string;
    name: string;
    description: string;
    image: string;
    category: Category;
    price: number;
    oldPrice?: number;
    rating: number;
    reviewsCount: number;
}

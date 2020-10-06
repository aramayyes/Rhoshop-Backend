
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateUserInput {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
}

export class Category {
    id: string;
    name: string;
    image: string;
}

export abstract class IQuery {
    abstract categories(language?: string): Category[] | Promise<Category[]>;

    abstract products(category?: string, language?: string): Product[] | Promise<Product[]>;

    abstract product(id: string, language?: string): Product | Promise<Product>;
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

export class User {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
}

export abstract class IMutation {
    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;
}

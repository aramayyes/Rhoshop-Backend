
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class SignInInput {
    email: string;
    password: string;
}

export class CreateUserInput {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
}

export class UpdateUserInput {
    id: string;
    name?: string;
    password?: string;
}

export class JwtToken {
    access_token: string;
    email: string;
}

export abstract class IMutation {
    abstract signIn(signInInput: SignInInput): JwtToken | Promise<JwtToken>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
}

export class Category {
    id: string;
    name: string;
    image: string;
}

export abstract class IQuery {
    abstract categories(language?: string): Category[] | Promise<Category[]>;

    abstract notifications(): Notification[] | Promise<Notification[]>;

    abstract products(category?: string, language?: string): Product[] | Promise<Product[]>;

    abstract product(id: string, language?: string): Product | Promise<Product>;

    abstract user(): User | Promise<User>;
}

export class Notification {
    id: string;
    message: string;
    date: DateTime;
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

export type DateTime = any;

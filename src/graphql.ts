
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
}

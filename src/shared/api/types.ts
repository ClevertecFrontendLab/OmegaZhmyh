import { MainCategory, SubCategory } from '~/entities/Category/types';
import { Recipe } from '~/entities/Recipe/types';

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface RecipeResponse {
    data: Recipe[];
    meta: Meta;
}

export type CategoriesResponse = (MainCategory | SubCategory)[];

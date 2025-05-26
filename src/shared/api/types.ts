import { MainCategory, SubCategory } from '~/entities/Category/types';
import { Recipe } from '~/features/types';

export type Meta = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type RecipeResponse = Partial<{
    data: Recipe[];
    meta: Meta;
}>;

export type CategoriesResponse = (MainCategory | SubCategory)[];

export type GetRecipesParams = Partial<{
    page: number;
    limit: number;
    allergens: string;
    searchString: string;
    meat: string;
    garnish: string;
    subcategoriesIds: string;
    sortBy: string;
    sortOrder: string;
}>;

export type GetRecipeBySubategoryParams = {
    subcategoryId: string;
    limit?: number;
};

export type MeasureUnit = {
    _id: string;
    name: string;
};

export type ImageUploadResponse = {
    name: string;
    url: string;
    _id: string;
};

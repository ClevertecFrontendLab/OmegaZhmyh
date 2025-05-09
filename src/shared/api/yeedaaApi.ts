import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setCategories } from '~/entities/Category/model/slice';
import { SubCategory } from '~/entities/Category/types';
import { MainCategory } from '~/entities/Category/types';
import { Recipe } from '~/entities/Recipe';

import { API_BASE_URL } from '../config/api-urls';
import {
    CategoriesResponse,
    GetRecipeBySubategoryParams,
    GetRecipesParams,
    RecipeResponse,
} from './types';

export const yeedaaApi = createApi({
    reducerPath: 'yeedaaApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),

    endpoints: (builder) => ({
        getCategories: builder.query<CategoriesResponse, void>({
            query: () => '/category',
            keepUnusedDataFor: Infinity,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCategories(data));
                } catch {
                    console.log('Categories fetch failed, using backup if available');
                }
            },
        }),
        getCategoryById: builder.query<MainCategory | SubCategory, string>({
            query: (id) => `/category/${id}`,
        }),
        getRecipes: builder.query<RecipeResponse, GetRecipesParams>({
            query: (params) => ({
                url: '/recipe',
                params,
            }),
        }),
        getRecipeBySubategory: builder.query<RecipeResponse, GetRecipeBySubategoryParams>({
            query: ({ subcategoryId, limit }) => ({
                url: `/recipe/category/${subcategoryId}`,
                params: {
                    limit,
                },
            }),
        }),
        getRecipeById: builder.query<Recipe, string>({
            query: (id) => `/recipe/${id}`,
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetRecipesQuery,
    useGetCategoryByIdQuery,
    useGetRecipeByIdQuery,
    useGetRecipeBySubategoryQuery,
} = yeedaaApi;

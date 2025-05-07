import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setCategories } from '~/entities/Category/model/slice';
import { SubCategory } from '~/entities/Category/types';
import { MainCategory } from '~/entities/Category/types';
import { Recipe } from '~/entities/Recipe';
import { setRecipes } from '~/entities/Recipe/model/slice';

import { API_BASE_URL } from '../config/constants';
import { CategoriesResponse, GetRecipesParams, RecipeResponse } from './types';

export const yeedaaApi = createApi({
    reducerPath: 'yeedaaApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({
        getCategories: builder.query<CategoriesResponse, void>({
            query: () => '/category',
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
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setRecipes(data.data));
                } catch {
                    console.log('Recipes fetch failed, using backup if available');
                }
            },
        }),
        getRecipeBySubategory: builder.query<RecipeResponse, string>({
            query: (subcategoryId) => ({
                url: `/recipe/category/${subcategoryId}`,
                params: {
                    limit: 8,
                },
            }),
        }),
        getRelevantRecipe: builder.query<RecipeResponse, string>({
            query: (subcategoryId) => ({
                url: `/recipe/category/${subcategoryId}`,
                params: {
                    limit: 5,
                },
            }),
        }),
        getLatestReciper: builder.query<RecipeResponse, void>({
            query: () => ({
                url: '/recipe',
                params: {
                    page: 1,
                    limit: 10,
                    sortBy: 'createdAt',
                    sortOrder: 'desc',
                },
            }),
        }),
        getTheJuiciestRecipe: builder.query<RecipeResponse, number>({
            query: (page = 1) => ({
                url: '/recipe',
                params: {
                    page: page,
                    limit: 8,
                    sortBy: 'likes',
                    sortOrder: 'desc',
                },
            }),
        }),
        getRecipeById: builder.query<Recipe, string>({
            query: (id) => `/recipe/${id}`,
        }),
        healthChkeck: builder.query<string, void>({
            query: () => 'health',
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetRecipesQuery,
    useGetCategoryByIdQuery,
    useGetRecipeByIdQuery,
    useGetLatestReciperQuery,
    useGetTheJuiciestRecipeQuery,
    useGetRecipeBySubategoryQuery,
    useGetRelevantRecipeQuery,
} = yeedaaApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '../config/constants';
import { backupCategories } from '../store/navigationBackupSlice';
import { CategoriesArray } from '../types/category';
import { Recipe } from '../types/types';

export const yeedaaApi = createApi({
    reducerPath: 'yeedaaApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({
        getCategories: builder.query<CategoriesArray, void>({
            query: () => '/category',
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(backupCategories(data));
                } catch {
                    console.log('Categories fetch failed, using backup if available');
                }
            },
        }),
        getRecipes: builder.query<Recipe[], void>({
            query: () => '/recipe',
        }),
        getRecipeById: builder.query<Recipe, string>({
            query: (id) => `/recipe/${id}`,
        }),
        healthChkeck: builder.query<string, void>({
            query: () => 'health',
        }),
    }),
});

export const { useGetCategoriesQuery, useGetRecipesQuery } = yeedaaApi;

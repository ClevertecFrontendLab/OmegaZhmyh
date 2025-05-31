import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { GetRecipeBySubategoryParams, GetRecipesParams, RecipeResponse } from '~/shared/api/types';
import { API_BASE_URL } from '~/shared/config/api-urls.constants';
import { ApplicationState } from '~/shared/store/configure-store';

import { CreateRecipe, Recipe } from '../model/types';

export const recipeApi = createApi({
    reducerPath: 'recipeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as ApplicationState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Recipe'],
    endpoints: (builder) => ({
        getRecipes: builder.query<RecipeResponse, GetRecipesParams>({
            query: (params) => ({
                url: '/recipe',
                params,
            }),
            providesTags: ['Recipe'],
        }),
        getRecipeBySubategory: builder.query<RecipeResponse, GetRecipeBySubategoryParams>({
            query: ({ subcategoryId, limit }) => ({
                url: `/recipe/category/${subcategoryId}`,
                params: { limit },
            }),
            providesTags: ['Recipe'],
        }),
        getRecipeById: builder.query<Recipe, string>({
            query: (id) => `/recipe/${id}`,
            providesTags: ['Recipe'],
        }),
        getRecipeByUserId: builder.query<Recipe[], string>({
            query: (userId) => `/recipe/user/${userId}`,
            providesTags: ['Recipe'],
        }),
        createRecipe: builder.mutation<Recipe, CreateRecipe>({
            query: (recipe) => ({
                url: '/recipe',
                method: 'POST',
                body: recipe,
            }),
            invalidatesTags: ['Recipe'],
        }),
        createRecipeDraft: builder.mutation<Recipe, Partial<CreateRecipe>>({
            query: (recipe) => ({
                url: '/recipe/draft',
                method: 'POST',
                body: recipe,
            }),
        }),
        updateRecipe: builder.mutation<void, { recipe: Partial<CreateRecipe>; id: string }>({
            query: ({ recipe, id }) => ({
                url: `/recipe/${id}`,
                method: 'PATCH',
                body: recipe,
            }),
            invalidatesTags: ['Recipe'],
        }),
        deleteRecipe: builder.mutation<void, string>({
            query: (id) => ({
                url: `/recipe/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Recipe'],
        }),
        likeRecipe: builder.mutation<void, string>({
            query: (id) => ({
                url: `/recipe/${id}/like`,
                method: 'POST',
            }),
            invalidatesTags: ['Recipe'],
        }),
        bookmarkRecipe: builder.mutation<void, string>({
            query: (id) => ({
                url: `/recipe/${id}/bookmark`,
                method: 'POST',
            }),
            invalidatesTags: ['Recipe'],
        }),
    }),
});

export const {
    useGetRecipesQuery,
    useGetRecipeBySubategoryQuery,
    useGetRecipeByIdQuery,
    useGetRecipeByUserIdQuery,
    useCreateRecipeMutation,
    useCreateRecipeDraftMutation,
    useUpdateRecipeMutation,
    useDeleteRecipeMutation,
    useLikeRecipeMutation,
    useBookmarkRecipeMutation,
} = recipeApi;

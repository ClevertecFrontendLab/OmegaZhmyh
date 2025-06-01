import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { GetRecipeBySubategoryParams, GetRecipesParams, RecipeResponse } from '~/shared/api/types';
import { API_BASE_URL } from '~/shared/config/api-urls.constants';
import { ApplicationState } from '~/shared/store/configure-store';

import { CreateRecipe, Recipe } from '../model/types';

const TAG_TYPES = {
    RECIPE: 'Recipe',
    RECIPE_LIST: 'RecipeList',
    BOOKMARK: 'Bookmark',
    LIKE: 'Like',
};

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
    tagTypes: [TAG_TYPES.RECIPE, TAG_TYPES.BOOKMARK, TAG_TYPES.LIKE],
    endpoints: (builder) => ({
        getRecipes: builder.query<RecipeResponse, GetRecipesParams>({
            query: (params) => ({
                url: '/recipe',
                params,
            }),
            providesTags: [TAG_TYPES.RECIPE_LIST, TAG_TYPES.BOOKMARK, TAG_TYPES.LIKE],
        }),
        getRecipeBySubategory: builder.query<RecipeResponse, GetRecipeBySubategoryParams>({
            query: ({ subcategoryId, limit }) => ({
                url: `/recipe/category/${subcategoryId}`,
                params: { limit },
            }),
            providesTags: [TAG_TYPES.RECIPE_LIST, TAG_TYPES.BOOKMARK, TAG_TYPES.LIKE],
        }),
        getRecipeById: builder.query<Recipe, string>({
            query: (id) => `/recipe/${id}`,
            providesTags: [TAG_TYPES.RECIPE, TAG_TYPES.BOOKMARK, TAG_TYPES.LIKE],
        }),
        getRecipeByUserId: builder.query<Recipe[], string>({
            query: (userId) => `/recipe/user/${userId}`,
            providesTags: [TAG_TYPES.RECIPE_LIST, TAG_TYPES.BOOKMARK, TAG_TYPES.LIKE],
        }),
        createRecipe: builder.mutation<Recipe, CreateRecipe>({
            query: (recipe) => ({
                url: '/recipe',
                method: 'POST',
                body: recipe,
            }),
            invalidatesTags: [TAG_TYPES.RECIPE_LIST],
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
            invalidatesTags: [TAG_TYPES.RECIPE],
        }),
        deleteRecipe: builder.mutation<void, string>({
            query: (id) => ({
                url: `/recipe/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [TAG_TYPES.RECIPE_LIST],
        }),
        likeRecipe: builder.mutation<void, string>({
            query: (id) => ({
                url: `/recipe/${id}/like`,
                method: 'POST',
            }),
            invalidatesTags: [TAG_TYPES.LIKE],
        }),
        bookmarkRecipe: builder.mutation<void, string>({
            query: (id) => ({
                url: `/recipe/${id}/bookmark`,
                method: 'POST',
            }),
            invalidatesTags: [TAG_TYPES.BOOKMARK],
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

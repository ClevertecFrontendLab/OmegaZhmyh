import { TAG_TYPES, yeedaaApi } from '~/shared/api';
import { API_URLS, HTTP_METHODS } from '~/shared/config';

import {
    GetRecipeBySubategoryParams,
    GetRecipesParams,
    RecipeResponse,
    RecipeResponseByUser,
} from '../model/recipe.types';
import { CreateRecipe, Recipe } from '../model/recipe.types';

export const recipeApi = yeedaaApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.query<RecipeResponse, GetRecipesParams>({
            query: (params) => ({
                url: API_URLS.RECIPES.BASE,
                params,
            }),
            providesTags: [TAG_TYPES.RECIPE_LIST, TAG_TYPES.BOOKMARK, TAG_TYPES.LIKE],
        }),
        getRecipeBySubategory: builder.query<RecipeResponse, GetRecipeBySubategoryParams>({
            query: ({ subcategoryId, limit }) => ({
                url: `${API_URLS.RECIPES.CATEGORIES}/${subcategoryId}`,
                params: { limit },
            }),
            providesTags: [TAG_TYPES.RECIPE_LIST, TAG_TYPES.BOOKMARK, TAG_TYPES.LIKE],
        }),
        getRecipeById: builder.query<Recipe, string>({
            query: (id) => `${API_URLS.RECIPES.BASE}/${id}`,
            providesTags: [TAG_TYPES.RECIPE, TAG_TYPES.BOOKMARK, TAG_TYPES.LIKE],
        }),
        getRecipeByUserId: builder.query<RecipeResponseByUser, string>({
            query: (userId) => `${API_URLS.RECIPES.USER}/${userId}`,
            providesTags: [TAG_TYPES.RECIPE_LIST, TAG_TYPES.BOOKMARK, TAG_TYPES.LIKE],
        }),
        createRecipe: builder.mutation<Recipe, CreateRecipe>({
            query: (recipe) => ({
                url: API_URLS.RECIPES.BASE,
                method: HTTP_METHODS.POST,
                body: recipe,
            }),
            invalidatesTags: [TAG_TYPES.RECIPE_LIST],
        }),
        updateRecipe: builder.mutation<void, { recipe: Partial<CreateRecipe>; id: string }>({
            query: ({ recipe, id }) => ({
                url: `${API_URLS.RECIPES.BASE}/${id}`,
                method: HTTP_METHODS.PATCH,
                body: recipe,
            }),
            invalidatesTags: [TAG_TYPES.RECIPE],
        }),
        deleteRecipe: builder.mutation<void, string>({
            query: (id) => ({
                url: `${API_URLS.RECIPES.BASE}/${id}`,
                method: HTTP_METHODS.DELETE,
            }),
            invalidatesTags: [TAG_TYPES.RECIPE_LIST],
        }),
        createRecipeDraft: builder.mutation<Recipe, Partial<CreateRecipe>>({
            query: (recipe) => ({
                url: API_URLS.RECIPES.DRAFT,
                method: HTTP_METHODS.POST,
                body: recipe,
            }),
            invalidatesTags: [TAG_TYPES.USER_INFO],
        }),
        updateRecipeDraft: builder.mutation<void, { recipe: Partial<CreateRecipe>; id: string }>({
            query: ({ recipe, id }) => ({
                url: `${API_URLS.RECIPES.DRAFT}/${id}`,
                method: HTTP_METHODS.PATCH,
                body: recipe,
            }),
            invalidatesTags: [TAG_TYPES.USER_INFO],
        }),
        deleteRecipeDraft: builder.mutation<void, string>({
            query: (id) => ({
                url: `${API_URLS.RECIPES.DRAFT}/${id}`,
                method: HTTP_METHODS.DELETE,
            }),
            invalidatesTags: [TAG_TYPES.USER_INFO],
        }),
        likeRecipe: builder.mutation<void, string>({
            query: (id) => ({
                url: `${API_URLS.RECIPES.BASE}/${id}${API_URLS.RECIPES.LIKE}`,
                method: HTTP_METHODS.POST,
            }),
            invalidatesTags: [TAG_TYPES.LIKE],
        }),
        bookmarkRecipe: builder.mutation<void, string>({
            query: (id) => ({
                url: `${API_URLS.RECIPES.BASE}/${id}${API_URLS.RECIPES.BOOKMARK}`,
                method: HTTP_METHODS.POST,
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
    useUpdateRecipeDraftMutation,
    useDeleteRecipeMutation,
    useDeleteRecipeDraftMutation,
    useLikeRecipeMutation,
    useBookmarkRecipeMutation,
} = recipeApi;

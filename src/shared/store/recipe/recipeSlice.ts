import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './initialState';

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
    selectors: {
        getRecipes: (state) => state,
    },
});

export type RecipeState = ReturnType<typeof recipeSlice.reducer>;
export const { getRecipes } = recipeSlice.selectors;

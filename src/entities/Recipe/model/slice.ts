import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe } from '../types';

export type RecipeState = {
    allRecipes: Recipe[];
};

const initialState: RecipeState = {
    allRecipes: [],
};

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setRecipes: (state, action: PayloadAction<Recipe[]>) => {
            state.allRecipes.push(...action.payload);
        },
    },
    selectors: {
        selectAllRecipes: (state) => state.allRecipes,
    },
});

export const { reducer: recipeReducer } = recipeSlice;
export const { setRecipes } = recipeSlice.actions;
export const { selectAllRecipes } = recipeSlice.selectors;

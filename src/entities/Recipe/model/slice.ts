import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe } from '../types';

interface RecipeState {
    allRecipes: Recipe[];
    pageRecipe: Recipe | null;
}

const initialState: RecipeState = {
    allRecipes: [],
    pageRecipe: null,
};

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setRecipes: (state, action: PayloadAction<Recipe[]>) => {
            state.allRecipes.push(...action.payload);
        },
        setPageRecipe: (state, action: PayloadAction<Recipe | null>) => {
            state.pageRecipe = action.payload;
        },
    },
});

export const { reducer: recipeReducer } = recipeSlice;
export const { setRecipes, setPageRecipe } = recipeSlice.actions;

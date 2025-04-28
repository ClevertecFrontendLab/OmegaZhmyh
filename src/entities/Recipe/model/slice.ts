import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './initialState';

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
});

export const { reducer: recipeReducer } = recipeSlice;

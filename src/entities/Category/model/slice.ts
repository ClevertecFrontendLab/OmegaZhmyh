import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialState } from './initialState';

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCurrentCategory(state, action: PayloadAction<string>) {
            state.currentCategory = action.payload;
        },
    },
});

export const { setCurrentCategory } = categorySlice.actions;
export const { reducer: categoryReducer } = categorySlice;

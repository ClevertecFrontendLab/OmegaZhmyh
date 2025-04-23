import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialState } from './initialState';

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setPageCategory(state, action: PayloadAction<string>) {
            state.pageCategory = action.payload;
        },
        setPageSubcategory(state, action: PayloadAction<string>) {
            state.pageSubategory = action.payload;
        },
    },
});

export const { setPageCategory, setPageSubcategory } = categorySlice.actions;
export const { reducer: categoryReducer } = categorySlice;

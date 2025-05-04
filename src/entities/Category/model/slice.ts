import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoriesResponse } from '~/shared/api/types';

import { categoryState, MainCategory, SubCategory } from '../types';

export const initialState: categoryState = {
    mainCategories: [],
    subCategories: [],
    allCategories: [],
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<CategoriesResponse>) {
            const categores: MainCategory[] = [];
            const subcategores: SubCategory[] = [];
            action.payload.forEach((category) => {
                if ('subCategories' in category) {
                    categores.push(category);
                } else {
                    subcategores.push(category);
                }
            });
            state.mainCategories = categores;
            state.subCategories = subcategores;
            state.allCategories = [...action.payload];
        },
    },
});

export const { setCategories } = categorySlice.actions;
export const { reducer: categoryReducer } = categorySlice;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoriesResponse } from '~/shared/api/types';

import { categoryState, MainCategory, SubCategory } from '../types';

export const initialState: categoryState = {
    pageCategory: null,
    pageSubategory: null,
    mainCategories: [],
    subCategories: [],
    allCategories: [],
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setPageCategory(state, action: PayloadAction<MainCategory | null>) {
            state.pageCategory = action.payload;
        },
        setPageSubcategory(state, action: PayloadAction<SubCategory | null>) {
            state.pageSubategory = action.payload;
        },
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

export const { setPageCategory, setPageSubcategory, setCategories } = categorySlice.actions;
export const { reducer: categoryReducer } = categorySlice;

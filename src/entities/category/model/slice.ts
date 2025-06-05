import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoriesResponse } from '../types';
import { CategoryState, MainCategory, SubCategory } from '../types';

export const initialState: CategoryState = {
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
    selectors: {
        selectAllCategories: (state) => state.allCategories,
        selectMainCategories: (state) => state.mainCategories,
        selectSubCategories: (state) => state.subCategories,
    },
});

export const selectRecipeSubCategories = (categoryIds: string[]) =>
    createSelector(
        [categorySlice.selectors.selectSubCategories, () => categoryIds],
        (subcategories, categoryIds) => subcategories.find((sub) => categoryIds.includes(sub._id)),
    );

export const selectCategoryById = (categoryId: string | undefined) =>
    createSelector(
        [categorySlice.selectors.selectMainCategories, () => categoryId],
        (categories, categoryId) => categories.find((cat) => cat._id === categoryId),
    );

export const { setCategories } = categorySlice.actions;
export const { reducer: categoryReducer } = categorySlice;
export const { selectAllCategories, selectMainCategories, selectSubCategories } =
    categorySlice.selectors;

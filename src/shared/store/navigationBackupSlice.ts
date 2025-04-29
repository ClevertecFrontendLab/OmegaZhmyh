import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoriesArray } from '../types/category';

export interface NavigationBackupState {
    categories: CategoriesArray;
    lastSuccessfulFetch: string | null;
}

const initialState: NavigationBackupState = {
    categories: [],
    lastSuccessfulFetch: null,
};

export const navigationBackupSlice = createSlice({
    name: 'navigationBackup',
    initialState,
    reducers: {
        backupCategories: (state, action: PayloadAction<CategoriesArray>) => {
            state.categories = action.payload;
            state.lastSuccessfulFetch = new Date().toISOString();
        },
    },
});

export const { backupCategories } = navigationBackupSlice.actions;

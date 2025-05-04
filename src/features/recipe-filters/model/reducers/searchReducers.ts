import { PayloadAction } from '@reduxjs/toolkit';

import { FiltersState } from '../types';

export const setSearchQuery = (state: FiltersState, action: PayloadAction<string>) => {
    state.search.searchQuery = action.payload;
    state.search.isSearchAvailable = action.payload.length >= 3;
};
export const setSearchActive = (state: FiltersState) => {
    if (state.search.isSearchAvailable) {
        state.search.activeSearchQuery = state.search.searchQuery;
        state.search.isSearchActive = true;
    }
};
export const setSearchLoading = (state: FiltersState, action: PayloadAction<boolean>) => {
    state.search.isSearchLoading = action.payload;
};
export const setCountSearchedRecipes = (state: FiltersState, action: PayloadAction<number>) => {
    state.search.countSearchedRecipes = action.payload;
};
export const resetSearch = (state: FiltersState) => {
    state.search.activeSearchQuery = '';
    state.search.isSearchActive = false;
};

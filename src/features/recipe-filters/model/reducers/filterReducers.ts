import { PayloadAction } from '@reduxjs/toolkit';

import { FiltersState } from '../types';
import { findFiltersAvailable, toggleFilter } from '../utils';

export const toggleCategory = (state: FiltersState, action: PayloadAction<string>) => {
    toggleFilter(state.drawerUIState.categories, action.payload);
    state.isAvailable = findFiltersAvailable(state);
};

export const toggleAuthor = (state: FiltersState, action: PayloadAction<string>) => {
    toggleFilter(state.drawerUIState.authors, action.payload);
    state.isAvailable = findFiltersAvailable(state);
};

export const toggleMeatType = (state: FiltersState, action: PayloadAction<string>) => {
    toggleFilter(state.drawerUIState.meatTypes, action.payload);
    state.isAvailable = findFiltersAvailable(state);
};

export const toggleSideDishe = (state: FiltersState, action: PayloadAction<string>) => {
    toggleFilter(state.drawerUIState.sideDishes, action.payload);
    state.isAvailable = findFiltersAvailable(state);
};

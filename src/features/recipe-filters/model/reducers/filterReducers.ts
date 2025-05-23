import { PayloadAction } from '@reduxjs/toolkit';

import { FiltersState } from '../types';
import { findFiltersAvailable, toggleFilter } from '../utils';

export const toggleCategory = (state: FiltersState, action: PayloadAction<string>) => {
    toggleFilter(state.drawerUIState.categoryFilters, action.payload);
    state.isAvailable = findFiltersAvailable(state);
};

export const toggleAuthor = (state: FiltersState, action: PayloadAction<string>) => {
    toggleFilter(state.drawerUIState.authorFilters, action.payload);
    state.isAvailable = findFiltersAvailable(state);
};

export const toggleMeatType = (state: FiltersState, action: PayloadAction<string>) => {
    toggleFilter(state.drawerUIState.meatTypeFilters, action.payload);
    state.isAvailable = findFiltersAvailable(state);
};

export const toggleSideDishe = (state: FiltersState, action: PayloadAction<string>) => {
    toggleFilter(state.drawerUIState.sideDishFilters, action.payload);
    state.isAvailable = findFiltersAvailable(state);
};

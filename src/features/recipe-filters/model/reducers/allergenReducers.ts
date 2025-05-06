import { PayloadAction } from '@reduxjs/toolkit';

import { FiltersState } from '../types';
import { findFiltersAvailable, toggleFilter } from '../utils';

export const toggleAllergenExcluding = (state: FiltersState) => {
    state.allergens.isExcluding = !state.allergens.isExcluding;
    if (!state.allergens.isExcluding) {
        state.allergens.selectedAllergens = [];
    }
};

export const toggleAllergen = (state: FiltersState, action: PayloadAction<string>) => {
    toggleFilter(state.allergens.selectedAllergens, action.payload);
    state.isAvailable = findFiltersAvailable(state);
    state.search.isSearchAvailable =
        state.allergens.selectedAllergens.length > 0 || state.search.searchQuery.length > 2;
};

export const setCustomAllergenInput = (state: FiltersState, action: PayloadAction<string>) => {
    state.allergens.customAllergen = action.payload;
};

export const addCustomAllergen = (state: FiltersState) => {
    if (
        state.allergens.customAllergen.trim() &&
        !state.allergens.selectedAllergens.includes(state.allergens.customAllergen)
    ) {
        state.allergens.selectedAllergens.push(state.allergens.customAllergen);
        state.allergens.customAllergen = '';
    }
    state.isAvailable = findFiltersAvailable(state);
};

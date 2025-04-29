import { PayloadAction } from '@reduxjs/toolkit';

import { FiltersState } from '../types';
import { findFiltersAvailable, toggleFilter } from '../utils';

export const toggleDrawerAllergenExcluding = (state: FiltersState) => {
    state.drawerUIState.allergens.isExcluding = !state.drawerUIState.allergens.isExcluding;
    if (!state.drawerUIState.allergens.isExcluding) {
        state.drawerUIState.allergens.selectedAllergens = [];
    }
};
export const toggleDrawerAllergen = (state: FiltersState, action: PayloadAction<string>) => {
    toggleFilter(state.drawerUIState.allergens.selectedAllergens, action.payload);
    state.drawerUIState.isAvailable = findFiltersAvailable(state.drawerUIState);
};
export const setDrawerCustomAllergenInput = (
    state: FiltersState,
    action: PayloadAction<string>,
) => {
    state.drawerUIState.allergens.customAllergen = action.payload;
};
export const addDrawerCustomAllergen = (state: FiltersState) => {
    if (
        state.drawerUIState.allergens.customAllergen.trim() &&
        !state.drawerUIState.allergens.selectedAllergens.includes(
            state.drawerUIState.allergens.customAllergen,
        )
    ) {
        state.drawerUIState.allergens.selectedAllergens.push(
            state.drawerUIState.allergens.customAllergen,
        );
        state.drawerUIState.allergens.customAllergen = '';
    }
    state.drawerUIState.isAvailable = findFiltersAvailable(state.drawerUIState);
};

export const toggleAllergenExcluding = (state: FiltersState) => {
    state.allergens.isExcluding = !state.allergens.isExcluding;
    if (!state.allergens.isExcluding) {
        state.allergens.selectedAllergens = [];
    }
};

export const toggleAllergen = (state: FiltersState, action: PayloadAction<string>) => {
    toggleFilter(state.allergens.selectedAllergens, action.payload);
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
};

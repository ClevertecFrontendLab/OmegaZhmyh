import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './initialState';
import * as allergenReducers from './reducers/allergenReducers';
import * as filterReducers from './reducers/filterReducers';
import * as searchReducers from './reducers/searchReducers';
export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        ...filterReducers,

        ...allergenReducers,

        ...searchReducers,

        setFiltersActive(state) {
            if (state.isAvailable) {
                state.isActive = true;
                state.currentFilters = state.drawerUIState;
                state.drawerUIState = structuredClone(initialState.drawerUIState);
            }
        },

        resetFilters(state) {
            state.drawerUIState = structuredClone(initialState.drawerUIState);
            state.currentFilters = structuredClone(initialState.currentFilters);
            state.allergens = structuredClone(initialState.allergens);
            state.isActive = false;
            state.isAvailable = false;
        },
    },
});

export const {
    addCustomAllergen,
    setCustomAllergenInput,
    toggleAllergen,
    toggleAllergenExcluding,
    resetSearch,
    setSearchQuery,
    setSearchActive,
    setFiltersActive,
    toggleCategory,
    toggleMeatType,
    toggleSideDishe,
    resetFilters,
    setSearchLoading,
    toggleAuthor,
    setCountSearchedRecipes,
} = filtersSlice.actions;

export const { reducer: filterReducer } = filtersSlice;

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

        setDrawerFiltersActive(state) {
            if (state.isAvailable) {
                state.isActive = true;
                state.drawerFilters = state.drawerUIState;
                state.drawerUIState = structuredClone(initialState.drawerUIState);
            }
        },

        resetDrawerFilters(state) {
            state.drawerUIState = structuredClone(initialState.drawerUIState);
            state.drawerFilters = structuredClone(initialState.drawerFilters);
            state.allergens = { ...initialState.allergens };
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
    toggleCategory,
    toggleMeatType,
    toggleSideDishe,
    addDrawerCustomAllergen,
    resetDrawerFilters,
    setDrawerCustomAllergenInput,
    setDrawerFiltersActive,
    setSearchLoading,
    toggleAuthor,
    toggleDrawerAllergen,
    toggleDrawerAllergenExcluding,
    setCountSearchedRecipes,
} = filtersSlice.actions;

export const { reducer: filterReducer } = filtersSlice;

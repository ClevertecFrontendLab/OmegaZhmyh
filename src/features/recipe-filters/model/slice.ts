import { createSelector, createSlice } from '@reduxjs/toolkit';

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
    selectors: {
        selectIsFiltersActive: (state) => state.isActive,
        selectIsFiltersAvailable: (state) => state.isAvailable,
        selectUiState: (state) => state.drawerUIState,
        selectFiltersOptions: (state) => state.filtersOptions,
        selectAllergenFilters: (state) => state.allergens,
        selectCurrentFilters: (state) => state.currentFilters,
        selectSearch: (state) => state.search,
        selectSearchQuery: (state) => state.search.searchQuery,
        selectCountSearchedRecipes: (state) => state.search.countSearchedRecipes,
        selectIsSearchActive: (state) => state.search.isSearchActive,
        selectIsSearchAvailable: (state) => state.search.isSearchAvailable,
        selectSearchLoading: (state) => state.search.isSearchLoading,
        selectActiveSearchQuery: (state) => state.search.activeSearchQuery,
    },
});

export const selectAllFilters = createSelector(
    [filtersSlice.selectors.selectAllergenFilters, filtersSlice.selectors.selectUiState],
    (
        { selectedAllergens },
        {
            categoryFilters: categories,
            meatTypeFilters: meatTypes,
            sideDishFilters: sideDishes,
            authorFilters: authors,
        },
    ) => [...selectedAllergens, ...categories, ...meatTypes, ...sideDishes, ...authors],
);

export const selectIsSearchInputInvalid = createSelector(
    filtersSlice.selectors.selectSearchQuery,
    filtersSlice.selectors.selectCountSearchedRecipes,
    (search, countSearchedRecipes) =>
        (search.length > 0 && search.length < 3) || countSearchedRecipes === 0,
);

export const {
    addCustomAllergen,
    toggleAllergen,
    toggleAllergenExcluding,
    toggleCategory,
    toggleMeatType,
    toggleSideDishe,
    toggleAuthor,
    setCustomAllergenInput,
    setSearchQuery,
    setSearchActive,
    setFiltersActive,
    setSearchLoading,
    setCountSearchedRecipes,
    resetFilters,
    resetSearch,
} = filtersSlice.actions;

export const {
    selectUiState,
    selectFiltersOptions,
    selectAllergenFilters,
    selectCurrentFilters,
    selectIsFiltersActive,
    selectIsFiltersAvailable,
    selectSearch,
    selectActiveSearchQuery,
    selectSearchQuery,
    selectCountSearchedRecipes,
    selectIsSearchActive,
    selectIsSearchAvailable,
    selectSearchLoading,
} = filtersSlice.selectors;

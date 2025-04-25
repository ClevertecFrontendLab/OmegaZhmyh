import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AllergenState {
    isExcluding: boolean;
    selectedAllergens: string[];
    customAllergen: string;
}

export interface SearchState {
    searchQuery: string;
    activeSearchQuery: string;
    isSearchAvailable: boolean;
    isSearchActive: boolean;
}

export interface DrawerState {
    isActive: boolean;
    isAvailable: boolean;
    meatTypes: string[];
    sideDishes: string[];
    categories: string[];
    authors: string[];
    allergens: AllergenState;
}

export interface FiltersState {
    drawerFilters: DrawerState;
    drawerUIState: DrawerState;
    search: SearchState;
    allergens: AllergenState;
}

const allergenInitialState: AllergenState = {
    isExcluding: false,
    selectedAllergens: [],
    customAllergen: '',
};

const drawerInitialState: DrawerState = {
    isActive: false,
    isAvailable: false,
    meatTypes: [],
    sideDishes: [],
    allergens: structuredClone(allergenInitialState),
    categories: [],
    authors: [],
};

const initialState: FiltersState = {
    drawerFilters: structuredClone(drawerInitialState),
    drawerUIState: structuredClone(drawerInitialState),
    search: {
        searchQuery: '',
        activeSearchQuery: '',
        isSearchAvailable: false,
        isSearchActive: false,
    },
    allergens: structuredClone(allergenInitialState),
};

const toggleFilter = (filters: string[], targetFilter: string) => {
    if (filters.includes(targetFilter)) {
        filters.splice(0, filters.length, ...filters.filter((f) => f !== targetFilter));
    } else {
        filters.push(targetFilter);
    }
};

const findFiltersAvailable = (drawerFilters: DrawerState) =>
    drawerFilters.meatTypes.length +
        drawerFilters.sideDishes.length +
        drawerFilters.allergens.selectedAllergens.length +
        drawerFilters.categories.length +
        drawerFilters.authors.length >=
    1;

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        toggleCategory(state, action: PayloadAction<string>) {
            toggleFilter(state.drawerUIState.categories, action.payload);
            state.drawerUIState.isAvailable = findFiltersAvailable(state.drawerUIState);
        },

        toggleAuthor(state, action: PayloadAction<string>) {
            toggleFilter(state.drawerUIState.authors, action.payload);
            state.drawerUIState.isAvailable = findFiltersAvailable(state.drawerUIState);
        },

        toggleMeatType(state, action: PayloadAction<string>) {
            toggleFilter(state.drawerUIState.meatTypes, action.payload);
            state.drawerUIState.isAvailable = findFiltersAvailable(state.drawerUIState);
        },

        toggleSideDishe(state, action: PayloadAction<string>) {
            toggleFilter(state.drawerUIState.sideDishes, action.payload);
            state.drawerUIState.isAvailable = findFiltersAvailable(state.drawerUIState);
        },

        toggleDrawerAllergenExcluding(state) {
            state.drawerUIState.allergens.isExcluding = !state.drawerUIState.allergens.isExcluding;
            if (!state.drawerUIState.allergens.isExcluding) {
                state.drawerUIState.allergens.selectedAllergens = [];
            }
        },
        toggleDrawerAllergen(state, action: PayloadAction<string>) {
            toggleFilter(state.drawerUIState.allergens.selectedAllergens, action.payload);
            state.drawerUIState.isAvailable = findFiltersAvailable(state.drawerUIState);
        },
        setDrawerCustomAllergenInput(state, action: PayloadAction<string>) {
            state.drawerUIState.allergens.customAllergen = action.payload;
        },
        addDrawerCustomAllergen(state) {
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
        },

        setDrawerFiltersActive(state) {
            if (state.drawerUIState.isAvailable) {
                state.drawerUIState.isActive = true;
                state.drawerFilters = state.drawerUIState;
                state.drawerUIState = structuredClone(drawerInitialState);
            }
        },

        resetDrawerFilters(state) {
            state.drawerUIState = structuredClone(drawerInitialState);
            state.drawerFilters = structuredClone(drawerInitialState);
            state.allergens = { ...allergenInitialState };
        },

        toggleAllergenExcluding(state) {
            state.allergens.isExcluding = !state.allergens.isExcluding;
            if (!state.allergens.isExcluding) {
                state.allergens.selectedAllergens = [];
            }
        },
        toggleAllergen(state, action: PayloadAction<string>) {
            toggleFilter(state.allergens.selectedAllergens, action.payload);
        },
        setCustomAllergenInput(state, action: PayloadAction<string>) {
            state.allergens.customAllergen = action.payload;
        },
        addCustomAllergen(state) {
            if (
                state.allergens.customAllergen.trim() &&
                !state.allergens.selectedAllergens.includes(state.allergens.customAllergen)
            ) {
                state.allergens.selectedAllergens.push(state.allergens.customAllergen);
                state.allergens.customAllergen = '';
            }
        },

        setSearchQuery(state, action: PayloadAction<string>) {
            state.search.searchQuery = action.payload;
            state.search.isSearchAvailable = action.payload.length >= 3;
        },
        setSearchActive(state) {
            if (state.search.isSearchAvailable) {
                state.search.activeSearchQuery = state.search.searchQuery;
                state.search.isSearchActive = true;
            }
        },
        resetSearch(state) {
            state.search.activeSearchQuery = '';
            state.search.isSearchActive = false;
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
    toggleAuthor,
    toggleDrawerAllergen,
    toggleDrawerAllergenExcluding,
} = filtersSlice.actions;

export const { reducer: filterReducer } = filtersSlice;

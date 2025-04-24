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
    search: SearchState;
    allergens: AllergenState;
}

const initialState: FiltersState = {
    drawerFilters: {
        isActive: false,
        isAvailable: false,
        meatTypes: [],
        sideDishes: [],
        allergens: {
            isExcluding: false,
            selectedAllergens: [],
            customAllergen: '',
        },
        categories: [],
        authors: [],
    },
    search: {
        searchQuery: '',
        activeSearchQuery: '',
        isSearchAvailable: false,
        isSearchActive: false,
    },
    allergens: {
        isExcluding: false,
        selectedAllergens: [],
        customAllergen: '',
    },
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
            toggleFilter(state.drawerFilters.categories, action.payload);
            state.drawerFilters.isAvailable = findFiltersAvailable(state.drawerFilters);
        },
        toggleAuthor(state, action: PayloadAction<string>) {
            toggleFilter(state.drawerFilters.authors, action.payload);
            state.drawerFilters.isAvailable = findFiltersAvailable(state.drawerFilters);
        },
        toggleMeatType(state, action: PayloadAction<string>) {
            toggleFilter(state.drawerFilters.meatTypes, action.payload);
            state.drawerFilters.isAvailable = findFiltersAvailable(state.drawerFilters);
        },
        toggleSideDishe(state, action: PayloadAction<string>) {
            toggleFilter(state.drawerFilters.sideDishes, action.payload);
            state.drawerFilters.isAvailable = findFiltersAvailable(state.drawerFilters);
        },
        toggleDrawerAllergenExcluding(state) {
            state.drawerFilters.allergens.isExcluding = !state.drawerFilters.allergens.isExcluding;
            if (!state.drawerFilters.allergens.isExcluding) {
                state.drawerFilters.allergens.selectedAllergens = [];
            }
        },
        toggleDrawerAllergen(state, action: PayloadAction<string>) {
            toggleFilter(state.drawerFilters.allergens.selectedAllergens, action.payload);
            state.drawerFilters.isAvailable = findFiltersAvailable(state.drawerFilters);
        },
        setDrawerCustomAllergenInput(state, action: PayloadAction<string>) {
            state.drawerFilters.allergens.customAllergen = action.payload;
        },
        addDrawerCustomAllergen(state) {
            if (
                state.drawerFilters.allergens.customAllergen.trim() &&
                !state.drawerFilters.allergens.selectedAllergens.includes(
                    state.drawerFilters.allergens.customAllergen,
                )
            ) {
                state.drawerFilters.allergens.selectedAllergens.push(
                    state.drawerFilters.allergens.customAllergen,
                );
                state.drawerFilters.allergens.customAllergen = '';
            }
            state.drawerFilters.isAvailable = findFiltersAvailable(state.drawerFilters);
        },
        setDrawerFiltersActive(state) {
            if (state.drawerFilters.isAvailable) {
                state.drawerFilters.isActive = true;
                state.allergens = { ...state.drawerFilters.allergens };
            }
        },
        resetDrawerFilters(state) {
            state.drawerFilters.isActive = false;
            state.drawerFilters.categories = [];
            state.drawerFilters.authors = [];
            state.drawerFilters.meatTypes = [];
            state.drawerFilters.sideDishes = [];
            state.drawerFilters.allergens = {
                isExcluding: false,
                customAllergen: '',
                selectedAllergens: [],
            };
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

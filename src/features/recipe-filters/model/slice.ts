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

export interface FiltersState {
    meatTypes: string[];
    sideDishes: string[];
    allergens: AllergenState;
    search: SearchState;
    categories: string[];
    subcategories: string[];
}

const initialState: FiltersState = {
    meatTypes: [],
    sideDishes: [],
    allergens: {
        isExcluding: false,
        selectedAllergens: [],
        customAllergen: '',
    },
    search: {
        searchQuery: '',
        activeSearchQuery: '',
        isSearchAvailable: false,
        isSearchActive: false,
    },
    categories: [],
    subcategories: [],
};

const toggleFilter = (filters: string[], targetFilter: string) => {
    if (filters.includes(targetFilter)) {
        filters = filters.filter((f) => f !== targetFilter);
    } else {
        filters.push(targetFilter);
    }
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        toggleCategory(state, action: PayloadAction<string>) {
            toggleFilter(state.categories, action.payload);
        },
        resetCategories(state) {
            state.categories = [];
        },
        toggleSubcategory(state, action: PayloadAction<string>) {
            toggleFilter(state.subcategories, action.payload);
        },
        resetSubcategories(state) {
            state.subcategories = [];
        },
        toggleMeatType(state, action: PayloadAction<string>) {
            const meatType = action.payload;
            if (state.meatTypes.includes(meatType)) {
                state.meatTypes = state.meatTypes.filter((m) => m !== meatType);
            } else {
                state.meatTypes.push(meatType);
            }
        },
        toggleSideDishe(state, action: PayloadAction<string>) {
            toggleFilter(state.sideDishes, action.payload);
        },
        toggleAllergenExcluding(state) {
            state.allergens.isExcluding = !state.allergens.isExcluding;
            if (!state.allergens.isExcluding) {
                state.allergens.selectedAllergens = [];
            }
        },
        toggleAllergen(state, action: PayloadAction<string>) {
            const allergen = action.payload;
            if (state.allergens.selectedAllergens.includes(allergen)) {
                state.allergens.selectedAllergens = state.allergens.selectedAllergens.filter(
                    (a) => a !== allergen,
                );
            } else {
                state.allergens.selectedAllergens.push(allergen);
            }
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
        removeAllergen(state, action: PayloadAction<string>) {
            state.allergens.selectedAllergens.filter((a) => a !== action.payload);
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
    removeAllergen,
    setCustomAllergenInput,
    toggleAllergen,
    toggleAllergenExcluding,
    resetSearch,
    setSearchQuery,
    setSearchActive,
    resetCategories,
    resetSubcategories,
    toggleCategory,
    toggleMeatType,
    toggleSideDishe,
    toggleSubcategory,
} = filtersSlice.actions;

export const { reducer: filterReducer } = filtersSlice;

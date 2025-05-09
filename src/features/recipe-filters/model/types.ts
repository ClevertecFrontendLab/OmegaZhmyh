export type AllergenState = {
    isExcluding: boolean;
    selectedAllergens: string[];
    customAllergen: string;
};

export type SearchState = {
    searchQuery: string;
    activeSearchQuery: string;
    isSearchAvailable: boolean;
    isSearchLoading: boolean;
    isSearchActive: boolean;
    countSearchedRecipes: number | null;
};

export type DrawerState = {
    meatTypeFilters: string[];
    sideDishFilters: string[];
    categoryFilters: string[];
    authorFilters: string[];
};

export type LabalState = {
    name: string;
    label: string;
};

export type FiltersState = {
    isActive: boolean;
    isAvailable: boolean;
    currentFilters: DrawerState;
    drawerUIState: DrawerState;
    filtersOptions: {
        allergenOptions: string[];
        sideDishOptions: string[];
        meatTypeOptions: string[];
        authorOptions: string[];
    };
    search: SearchState;
    allergens: AllergenState;
};

export interface AllergenState {
    isExcluding: boolean;
    selectedAllergens: string[];
    customAllergen: string;
}

export interface SearchState {
    searchQuery: string;
    activeSearchQuery: string;
    isSearchAvailable: boolean;
    isSearchLoading: boolean;
    isSearchActive: boolean;
    countSearchedRecipes: number;
}

export interface DrawerState {
    meatTypes: string[];
    sideDishes: string[];
    categories: string[];
    authors: string[];
    allergens: AllergenState;
}

export interface LabalState {
    name: string;
    label: string;
}

export interface FiltersState {
    isActive: boolean;
    isAvailable: boolean;
    drawerFilters: DrawerState;
    drawerUIState: DrawerState;
    options: {
        allergenFilters: string[];
        sideDishFilters: string[];
        meatTypeFilters: string[];
        authorFilters: string[];
    };
    search: SearchState;
    allergens: AllergenState;
}

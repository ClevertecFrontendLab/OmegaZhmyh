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
    countSearchedRecipes: number;
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

export interface LabalState {
    name: string;
    label: string;
}

export interface FiltersState {
    drawerFilters: DrawerState;
    drawerUIState: DrawerState;
    labels: {
        allergenFilters: LabalState[];
        sideDishFilters: LabalState[];
        meatTypeFilters: LabalState[];
        authorFilters: LabalState[];
    };
    search: SearchState;
    allergens: AllergenState;
}

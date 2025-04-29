import { DrawerState } from './types';

export const toggleFilter = (filters: string[], targetFilter: string) => {
    if (filters.includes(targetFilter)) {
        filters.splice(0, filters.length, ...filters.filter((f) => f !== targetFilter));
    } else {
        filters.push(targetFilter);
    }
};

export const findFiltersAvailable = (drawerFilters: DrawerState) =>
    drawerFilters.meatTypes.length +
        drawerFilters.sideDishes.length +
        drawerFilters.allergens.selectedAllergens.length +
        drawerFilters.categories.length +
        drawerFilters.authors.length >=
    1;

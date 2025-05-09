import { FiltersState } from './types';

export const toggleFilter = (filters: string[], targetFilter: string) => {
    if (filters.includes(targetFilter)) {
        filters.splice(0, filters.length, ...filters.filter((f) => f !== targetFilter));
    } else {
        filters.push(targetFilter);
    }
};

export const findFiltersAvailable = (filters: FiltersState) =>
    filters.drawerUIState.meatTypeFilters.length +
        filters.drawerUIState.sideDishFilters.length +
        filters.allergens.selectedAllergens.length +
        filters.drawerUIState.categoryFilters.length +
        filters.drawerUIState.authorFilters.length >
    0;

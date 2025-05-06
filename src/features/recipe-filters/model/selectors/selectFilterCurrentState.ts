import { ApplicationState } from '~/shared/store/configure-store';

export const selectIsFiltersAvailable = (state: ApplicationState) => state.filters.isAvailable;
export const selectIsFiltersActive = (state: ApplicationState) => state.filters.isActive;

export const selectAuthorFilter = (state: ApplicationState) => state.filters.currentFilters.authors;
export const selectCategoryFilter = (state: ApplicationState) =>
    state.filters.currentFilters.categories;
export const selectMeatTypeFilter = (state: ApplicationState) =>
    state.filters.currentFilters.meatTypes;
export const selectSideDishFilter = (state: ApplicationState) =>
    state.filters.currentFilters.sideDishes;

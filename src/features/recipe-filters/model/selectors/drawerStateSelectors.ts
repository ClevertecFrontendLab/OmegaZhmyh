import { ApplicationState } from '~/shared/store/configure-store';

export const selectIsFiltersAvailable = (state: ApplicationState) => state.filters.isAvailable;
export const selectIsFiltersActive = (state: ApplicationState) => state.filters.isActive;
export const selectCategoryFilter = (state: ApplicationState) =>
    state.filters.drawerUIState.categories;
export const selectAuthorsFilter = (state: ApplicationState) => state.filters.drawerUIState.authors;

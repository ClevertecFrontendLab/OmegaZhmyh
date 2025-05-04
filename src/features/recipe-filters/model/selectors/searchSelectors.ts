import { ApplicationState } from '~/shared/store/configure-store';

export const selectActiveSearchQuery = (state: ApplicationState) =>
    state.filters.search.activeSearchQuery;
export const selectIsSearchActive = (state: ApplicationState) =>
    state.filters.search.isSearchActive;
export const selectIsSearchAvailable = (state: ApplicationState) =>
    state.filters.search.isSearchAvailable;
export const selectSearchLoading = (state: ApplicationState) =>
    state.filters.search.isSearchLoading;
export const selectSearchQuery = (state: ApplicationState) => state.filters.search.searchQuery;
export const selectCountSearchedRecipes = (state: ApplicationState) =>
    state.filters.search.countSearchedRecipes;

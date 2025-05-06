import { ApplicationState } from '~/shared/store/configure-store';

export const selectCategoryFilter = (state: ApplicationState) =>
    state.filters.drawerUIState.categories;
export const selectUIAuthorFilter = (state: ApplicationState) =>
    state.filters.drawerUIState.authors;
export const selectUISideDishFilter = (state: ApplicationState) =>
    state.filters.drawerUIState.sideDishes;
export const selectUIMeatTypeFilter = (state: ApplicationState) =>
    state.filters.drawerUIState.meatTypes;

export const selectSideDishesOptions = (state: ApplicationState) =>
    state.filters.options.sideDishFilters;
export const selectMeatTypeOptions = (state: ApplicationState) =>
    state.filters.options.meatTypeFilters;

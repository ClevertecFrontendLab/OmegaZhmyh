import { ApplicationState } from '~/shared/store/configure-store';

export const selectSideDishesFilters = (state: ApplicationState) =>
    state.filters.drawerUIState.sideDishes;
export const selectSideDishesOptions = (state: ApplicationState) =>
    state.filters.options.sideDishFilters;

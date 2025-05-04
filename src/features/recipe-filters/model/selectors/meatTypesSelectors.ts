import { ApplicationState } from '~/shared/store/configure-store';

export const selectMeatTypesFilters = (state: ApplicationState) =>
    state.filters.drawerUIState.meatTypes;
export const selectMeatTypeOptions = (state: ApplicationState) =>
    state.filters.options.meatTypeFilters;

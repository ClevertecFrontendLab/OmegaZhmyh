import { ApplicationState } from '~/shared/store/configure-store';

export const selectMeatTypesFilters = (state: ApplicationState) =>
    state.filters.drawerFilters.meatTypes;

import { ApplicationState } from '~/shared/store/configure-store';

export const selectIsDrawerExcluding = (state: ApplicationState) =>
    state.filters.drawerFilters.allergens.isExcluding;

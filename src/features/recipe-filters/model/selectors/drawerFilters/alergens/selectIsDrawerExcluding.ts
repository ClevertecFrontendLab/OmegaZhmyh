import { ApplicationState } from '~/shared/store/configure-store';

export const selectIsDrawerExcluding = (state: ApplicationState) =>
    state.filters.drawerUIState.allergens.isExcluding;

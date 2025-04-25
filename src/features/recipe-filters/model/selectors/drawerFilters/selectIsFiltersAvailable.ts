import { ApplicationState } from '~/shared/store/configure-store';

export const selectIsFiltersAvailable = (state: ApplicationState) =>
    state.filters.drawerUIState.isAvailable;

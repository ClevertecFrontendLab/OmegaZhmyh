import { ApplicationState } from '~/shared/store/configure-store';

export const selectIsFiltersActive = (state: ApplicationState) =>
    state.filters.drawerUIState.isActive;

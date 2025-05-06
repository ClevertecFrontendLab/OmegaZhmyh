import { ApplicationState } from '~/shared/store/configure-store';

export const selectAllDrawerFilters = (state: ApplicationState) => state.filters.currentFilters;

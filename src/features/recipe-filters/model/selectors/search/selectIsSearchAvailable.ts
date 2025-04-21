import { ApplicationState } from '~/shared/store/configure-store';

export const selectIsSearchAvailable = (state: ApplicationState) =>
    state.filters.search.isSearchAvailable;

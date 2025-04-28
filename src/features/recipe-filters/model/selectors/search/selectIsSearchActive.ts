import { ApplicationState } from '~/shared/store/configure-store';

export const selectIsSearchActive = (state: ApplicationState) =>
    state.filters.search.isSearchActive;

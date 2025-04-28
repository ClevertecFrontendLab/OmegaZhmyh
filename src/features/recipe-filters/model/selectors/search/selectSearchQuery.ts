import { ApplicationState } from '~/shared/store/configure-store';

export const selectSearchQuery = (state: ApplicationState) => state.filters.search.searchQuery;

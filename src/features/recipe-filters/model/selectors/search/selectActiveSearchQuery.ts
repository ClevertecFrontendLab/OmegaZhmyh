import { ApplicationState } from '~/shared/store/configure-store';

export const selectActiveSearchQuery = (state: ApplicationState) =>
    state.filters.search.activeSearchQuery;

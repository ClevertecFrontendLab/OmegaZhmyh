import { ApplicationState } from '~/shared/store/configure-store';

export const selectRecipeQuery = (state: ApplicationState) =>
    state.filters.search.activeSearchQuery;

import { ApplicationState } from '~/shared/store/configure-store';

export const selectCountSearchedRecipes = (state: ApplicationState) =>
    state.filters.search.countSearchedRecipes;

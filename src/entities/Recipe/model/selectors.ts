import { ApplicationState } from '~/shared/store/configure-store';

export const selectAllRecipes = (state: ApplicationState) => state.recipes.allRecipes;
export const selectRecipeQuery = (state: ApplicationState) =>
    state.filters.search.activeSearchQuery;

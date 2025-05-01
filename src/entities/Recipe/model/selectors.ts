import { ApplicationState } from '~/shared/store/configure-store';

export const selectAllRecipes = (state: ApplicationState) => state.recipes.allRecipes;
export const selectPageRecipe = (state: ApplicationState) => state.recipes.pageRecipe;
export const selectRecipeQuery = (state: ApplicationState) =>
    state.filters.search.activeSearchQuery;

import { ApplicationState } from '~/shared/store/configure-store';

export const getNewRecipeSelector = (state: ApplicationState) =>
    [...state.recipes].sort((recipeA, recipeB) => (recipeA.date > recipeB.date ? 0 : 1));

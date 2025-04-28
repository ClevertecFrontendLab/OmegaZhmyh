import { ApplicationState } from '~/shared/store/configure-store';

export const selectAllRecipes = (state: ApplicationState) => state.recipes;

import { createSelector } from '@reduxjs/toolkit';

import { selectSerchedRecipes } from '~/features/recipe-filters';

export const selectNewFiltredRecipes = createSelector([selectSerchedRecipes], (recipes) =>
    [...recipes].sort((recipeA, recipeB) => (recipeA.date > recipeB.date ? 0 : 1)),
);

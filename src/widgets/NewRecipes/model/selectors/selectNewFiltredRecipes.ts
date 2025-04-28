import { createSelector } from '@reduxjs/toolkit';

import { selectSerchedRecipes } from '~/features/recipe-filters';

export const selectNewFiltredRecipes = createSelector([selectSerchedRecipes], (recipes) => {
    const result = [...recipes];
    result.sort((recipeA, recipeB) => Date.parse(recipeB.date) - Date.parse(recipeA.date));
    return result;
});

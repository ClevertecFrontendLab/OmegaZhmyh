import { createSelector } from '@reduxjs/toolkit';

import { selectActiveSearchQuery } from '~/features/recipe-filters/model/selectors/search/selectActiveSearchQuery';
import { selectIsSearchActive } from '~/features/recipe-filters/model/selectors/search/selectIsSearchActive';

import { selectFilteredRecipes } from './selectFilteredRecipes';

export const selectSerchedRecipes = createSelector(
    [selectFilteredRecipes, selectActiveSearchQuery, selectIsSearchActive],
    (filtredrecipes, searchQuery, isSearchActive) => {
        if (isSearchActive) {
            return filtredrecipes.filter((recipe) =>
                recipe.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()),
            );
        } else {
            return filtredrecipes;
        }
    },
);

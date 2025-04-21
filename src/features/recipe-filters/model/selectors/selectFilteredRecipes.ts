import { createSelector } from '@reduxjs/toolkit';

import { selectCurrentCategory } from '~/entities/Category';
import { selectAllRecipes } from '~/entities/Recipe';

import { selectSelectedAllergens } from './alergens/selectSelectedAllergens';
import { selectMeatTypesFilters } from './selectMeatTypesFilters';
import { selectSideDishesFilters } from './selectSideDishesFilters';

export const selectFilteredRecipes = createSelector(
    [
        selectAllRecipes,
        selectMeatTypesFilters,
        selectSelectedAllergens,
        selectSideDishesFilters,
        selectCurrentCategory,
    ],
    (recipes, meatFilters, selectedAllergens, sideDishesFilters, currentCategory) => {
        const filtredrecipes = recipes.filter((recipe) => {
            const includeAllergen = recipe.ingredients.some((ingredient) =>
                selectedAllergens.includes(ingredient.title),
            );
            const includeFiltredMeat = recipe.meat && meatFilters.includes(recipe.meat);
            const includeFiltredSideDishes = recipe.side && sideDishesFilters.includes(recipe.side);
            const isInCurrentCategory =
                recipe.category.includes(currentCategory) || currentCategory === '';
            if (
                includeAllergen ||
                includeFiltredMeat ||
                includeFiltredSideDishes ||
                !isInCurrentCategory
            ) {
                return false;
            }
            return true;
        });
        return filtredrecipes;
    },
);

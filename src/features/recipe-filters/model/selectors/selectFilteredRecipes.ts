import { createSelector } from '@reduxjs/toolkit';

import { selectPageCategory, selectPageSubcategory } from '~/entities/Category';
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
        selectPageCategory,
        selectPageSubcategory,
    ],
    (recipes, meatFilters, selectedAllergens, sideDishesFilters, pageCategory, pageSubcategory) => {
        const filtredrecipes = recipes.filter((recipe) => {
            const includeAllergen = recipe.ingredients.some((ingredient) =>
                selectedAllergens.includes(ingredient.title),
            );
            const includeFiltredMeat = recipe.meat && meatFilters.includes(recipe.meat);
            const includeFiltredSideDishes = recipe.side && sideDishesFilters.includes(recipe.side);
            const isInPageCategory = recipe.category.includes(pageCategory) || pageCategory === '';
            const isInPageSubcategory =
                recipe.subcategory.includes(pageSubcategory) || pageSubcategory === '';
            if (
                includeAllergen ||
                includeFiltredMeat ||
                includeFiltredSideDishes ||
                !isInPageCategory ||
                !isInPageSubcategory
            ) {
                return false;
            }
            return true;
        });
        return filtredrecipes;
    },
);

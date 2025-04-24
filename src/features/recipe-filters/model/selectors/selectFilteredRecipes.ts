import { createSelector } from '@reduxjs/toolkit';

import { selectPageCategory, selectPageSubcategory } from '~/entities/Category';
import { selectAllRecipes } from '~/entities/Recipe';

import { selectSelectedAllergens } from './alergens/selectSelectedAllergens';
import { selectDrawerAllergens } from './drawerFilters/alergens/selectDrawerAllergens';
import { selectAuthorsFilter } from './drawerFilters/selectAuthorsFilter';
import { selectCategoryFilter } from './drawerFilters/selectCategoryFilter';
import { selectIsFiltersActive } from './drawerFilters/selectIsFiltersActive';
import { selectMeatTypesFilters } from './drawerFilters/selectMeatTypesFilters';
import { selectSideDishesFilters } from './drawerFilters/selectSideDishesFilters';

export const selectFilteredRecipes = createSelector(
    [
        selectAllRecipes,
        selectPageCategory,
        selectPageSubcategory,
        selectIsFiltersActive,
        selectCategoryFilter,
        selectAuthorsFilter,
        selectMeatTypesFilters,
        selectSideDishesFilters,
        selectDrawerAllergens,
        selectSelectedAllergens,
    ],
    (
        allRecipes,
        pageCategory,
        pageSubcategory,
        isFiltersActive,
        categoryFilters,
        _authorsFilters,
        meatFilters,
        sideDishesFilters,
        drawerAllergens,
        selectedAllergens,
    ) => {
        const filtredrecipes = allRecipes.filter((recipe) => {
            const isInPageCategory = recipe.category.includes(pageCategory) || pageCategory === '';
            const isInPageSubcategory =
                recipe.subcategory.includes(pageSubcategory) || pageSubcategory === '';

            const includeAllergen = recipe.ingredients.some((ingredient) =>
                selectedAllergens.includes(ingredient.title),
            );

            const includeFiltredCategory = recipe.category.some((category) =>
                categoryFilters.includes(category),
            );
            //const includeFiltredAuthors = recipe.authors.some((author) => authorsFilters.includes(author));
            const includeFiltredMeat = recipe.meat && meatFilters.includes(recipe.meat);
            const includeFiltredSideDishes = recipe.side && sideDishesFilters.includes(recipe.side);
            const includeDrawerAllergen = recipe.ingredients.some((ingredient) =>
                drawerAllergens.includes(ingredient.title),
            );

            if (!isFiltersActive) {
                return !includeAllergen && isInPageCategory && isInPageSubcategory;
            }
            return (
                (includeFiltredCategory || includeFiltredMeat || includeFiltredSideDishes) &&
                !includeDrawerAllergen
            );
        });
        return filtredrecipes;
    },
);

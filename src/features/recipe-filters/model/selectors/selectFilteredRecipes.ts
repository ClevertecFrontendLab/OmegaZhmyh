import { createSelector } from '@reduxjs/toolkit';

import { selectPageCategory, selectPageSubcategory } from '~/entities/Category';
import { selectAllRecipes } from '~/entities/Recipe';

import { selectSelectedAllergens } from './alergens/selectSelectedAllergens';
import { selectAllDrawerFilters } from './drawerFilters/selectAllDrawerFilters';

export const selectFilteredRecipes = createSelector(
    [
        selectAllRecipes,
        selectPageCategory,
        selectPageSubcategory,
        selectSelectedAllergens,
        selectAllDrawerFilters,
    ],
    (
        allRecipes,
        pageCategory,
        pageSubcategory,
        selectedAllergens,
        /* isFiltersActive,
        categoryFilters,
        _authorsFilters,
        meatFilters,
        sideDishesFilters,
        drawerAllergens, */
        {
            allergens: drawerAllergens,
            authors: _authorsFilters,
            categories: categoryFilters,
            isActive: isFiltersActive,
            meatTypes: meatFilters,
            sideDishes: sideDishesFilters,
        },
    ) => {
        const filtredrecipes = allRecipes.filter((recipe) => {
            const isInPageCategory = recipe.category.includes(pageCategory) || pageCategory === '';
            const isInPageSubcategory =
                recipe.subcategory.includes(pageSubcategory) || pageSubcategory === '';

            const includeAllergen = recipe.ingredients.some((ingredient) =>
                selectedAllergens.some((selAllergen) =>
                    ingredient.title.includes(selAllergen.toLocaleLowerCase()),
                ),
            );

            const includeFiltredCategory = categoryFilters.length
                ? categoryFilters.some((filter) => recipe.category.includes(filter))
                : true;
            //const includeFiltredAuthors = recipe.authors.some((author) => authorsFilters.includes(author));
            const includeFiltredMeat = meatFilters.length
                ? recipe.meat && meatFilters.includes(recipe.meat)
                : true;
            const includeFiltredSideDishes = sideDishesFilters.length
                ? recipe.side && sideDishesFilters.includes(recipe.side)
                : true;
            const includeDrawerAllergen = drawerAllergens.selectedAllergens.length
                ? recipe.ingredients.some((ingredient) =>
                      drawerAllergens.selectedAllergens.includes(ingredient.title),
                  )
                : false;

            if (!isFiltersActive) {
                return !includeAllergen && isInPageCategory && isInPageSubcategory;
            }
            return (
                includeFiltredCategory &&
                includeFiltredMeat &&
                includeFiltredSideDishes &&
                !includeDrawerAllergen
            );
        });
        return filtredrecipes;
    },
);

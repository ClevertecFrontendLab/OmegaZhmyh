import { createSelector } from '@reduxjs/toolkit';

import {
    selectMainCategories,
    selectPageCategory,
    selectPageSubcategory,
    selectSubcategories,
} from '~/entities/Category';
import { selectAllRecipes } from '~/entities/Recipe';

import { selectSelectedAllergens } from './alergens/selectSelectedAllergens';
import { selectAllDrawerFilters } from './drawerFilters/selectAllDrawerFilters';

export const selectFilteredRecipes = createSelector(
    [
        selectAllRecipes,
        selectPageCategory,
        selectPageSubcategory,
        selectMainCategories,
        selectSubcategories,
        selectSelectedAllergens,
        selectAllDrawerFilters,
    ],
    (
        allRecipes,
        pageCategory,
        pageSubcategory,
        mainCategories,
        subcategories,
        selectedAllergens,
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
            const recipeSubcategories = subcategories.filter((subcategory) =>
                recipe.categoriesIds.includes(subcategory._id),
            );
            const recipeMainCategories = mainCategories.filter((mainCategory) =>
                recipeSubcategories
                    .map((subCategory) => subCategory.rootCategoryId)
                    .includes(mainCategory._id),
            );

            const isInPageCategory =
                recipeMainCategories.some(
                    (mainCategory) => mainCategory.category === pageCategory,
                ) || pageCategory === '';
            const isInPageSubcategory =
                recipeSubcategories.some((subcategory) => subcategory.title === pageSubcategory) ||
                pageSubcategory === '';

            const includeAllergen = recipe.ingredients.some((ingredient) =>
                selectedAllergens.some((selAllergen) =>
                    ingredient.title.includes(selAllergen.toLocaleLowerCase()),
                ),
            );

            const includeFiltredCategory = categoryFilters.length
                ? categoryFilters.some((filter) =>
                      recipeMainCategories.some((mainCategory) => mainCategory.category === filter),
                  )
                : true;
            //const includeFiltredAuthors = recipe.authors.some((author) => authorsFilters.includes(author));
            const includeFiltredMeat = meatFilters.length
                ? recipe.meat && meatFilters.includes(recipe.meat)
                : true;
            const includeFiltredSideDishes = sideDishesFilters.length
                ? recipe.garnish && sideDishesFilters.includes(recipe.garnish)
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

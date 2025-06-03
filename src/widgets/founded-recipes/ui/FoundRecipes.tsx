import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MainCategory, selectMainCategories } from '~/entities/category';
import { useGetRecipesQuery } from '~/entities/recipe/';
import {
    selectActiveSearchQuery,
    selectAllergenFilters,
    selectCountSearchedRecipes,
    selectIsFiltersActive,
    selectIsSearchActive,
    setCountSearchedRecipes,
    setSearchLoading,
} from '~/features/recipe-filters';
import { selectCurrentFilters } from '~/features/recipe-filters/model/slice';
import { RecipeCardList } from '~/shared/ui/recipe-card-list';

export function FoundRecipes({ cuisinePageFilter }: { cuisinePageFilter?: string }) {
    const dispatch = useDispatch();

    const isSearchActive = useSelector(selectIsSearchActive);
    const searchString = useSelector(selectActiveSearchQuery);

    const isFiltersActive = useSelector(selectIsFiltersActive);
    const { selectedAllergens } = useSelector(selectAllergenFilters);
    const { categoryFilters, meatTypeFilters, sideDishFilters } = useSelector(selectCurrentFilters);
    const mainCategories = useSelector(selectMainCategories);
    const countOfSearchedRecipes = useSelector(selectCountSearchedRecipes);

    const pageCategoryRecipeQuery = mainCategories
        .find((main) => main.category === cuisinePageFilter)
        ?.subCategories.map((sub) => sub.category)
        .join(',');

    const selectedMainCategories: MainCategory[] = mainCategories.filter((main) =>
        categoryFilters.includes(main.title),
    );

    const neededSubcategoriesIds: string = selectedMainCategories
        .map((main) => main.subCategories.map((sub) => sub._id).join(','))
        .join(',');

    const {
        data: searchedRecipes,
        isSuccess: isSearchedRecipesSuccess,
        isLoading: isSearchedRecipesLoading,
    } = useGetRecipesQuery(
        {
            page: 1,
            limit: 8,
            allergens: selectedAllergens.join(',') || undefined,
            garnish: sideDishFilters.join(',') || undefined,
            meat: meatTypeFilters.join(',') || undefined,
            searchString: searchString || undefined,
            subcategoriesIds: cuisinePageFilter
                ? pageCategoryRecipeQuery
                : neededSubcategoriesIds || undefined,
        },
        { skip: !isSearchActive && !isFiltersActive },
    );
    const recipes = searchedRecipes?.data;

    useEffect(() => {
        dispatch(setSearchLoading(isSearchedRecipesLoading));
    }, [isSearchedRecipesLoading, dispatch]);

    useEffect(() => {
        if (isSearchedRecipesSuccess) {
            dispatch(setCountSearchedRecipes(searchedRecipes?.data?.length || 0));
        }
    }, [isSearchedRecipesSuccess, dispatch, searchedRecipes]);

    return countOfSearchedRecipes && (isSearchActive || isFiltersActive) ? (
        <RecipeCardList
            recipes={recipes}
            columns={{ base: 1, xl: 2, lg: 1, md: 2 }}
            columnGap={{ base: '16px', xl: '24px' }}
            rowGap={{ base: '12px', md: '16px', xl: '24px' }}
            mt={{ base: '12px' }}
        />
    ) : null;
}

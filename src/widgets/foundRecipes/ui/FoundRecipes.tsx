import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MainCategory, selectMainCategories } from '~/entities/Category';
import {
    selectActiveSearchQuery,
    selectCategoryFilter,
    selectCountSearchedRecipes,
    selectIsFiltersActive,
    selectIsSearchActive,
    selectMeatTypeFilter,
    selectSelectedAllergens,
    selectSideDishFilter,
    setCountSearchedRecipes,
    setSearchLoading,
} from '~/features/recipe-filters';
import { useGetRecipesQuery } from '~/shared/api/yeedaaApi';
import { RecipeCardList } from '~/shared/ui/RecipeCardList';

interface FoundRecipesProps {
    cuisinePageFilter?: string;
}

export function FoundRecipes({ cuisinePageFilter }: FoundRecipesProps) {
    const dispatch = useDispatch();

    const isSearchActive = useSelector(selectIsSearchActive);
    const searchString = useSelector(selectActiveSearchQuery);

    const isFiltersActive = useSelector(selectIsFiltersActive);
    const selectedAllergens = useSelector(selectSelectedAllergens);

    const selectedSideDishes = useSelector(selectSideDishFilter);
    const selectedMeatTypes = useSelector(selectMeatTypeFilter);
    const selectedCategories = useSelector(selectCategoryFilter);
    const mainCategories = useSelector(selectMainCategories);
    const countOfSearchedRecipes = useSelector(selectCountSearchedRecipes);

    const pageCategoryRecipeQuery = mainCategories
        .find((main) => main.category == cuisinePageFilter)
        ?.subCategories.map((sub) => sub.category)
        .join(',');

    const selectedMainCategories: MainCategory[] = mainCategories.filter((main) =>
        selectedCategories.includes(main.title),
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
            garnish: selectedSideDishes.join(',') || undefined,
            meat: selectedMeatTypes.join(',') || undefined,
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
            dispatch(setCountSearchedRecipes(searchedRecipes?.meta.total || 0));
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

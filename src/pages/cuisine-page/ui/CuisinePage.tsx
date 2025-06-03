import { Button, Flex, Link } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router';

import { selectMainCategories, selectSubCategories } from '~/entities/Category';
import { useGetRecipeBySubategoryQuery } from '~/entities/Recipe/api/recipeApi';
import { selectCountSearchedRecipes, selectIsSearchActive } from '~/features/recipe-filters/';
import { LINK_VARIANT } from '~/shared/config/chakra-variants.constants';
import { RECIPES_LIMITS } from '~/shared/config/limits.constants';
import { setPageLoader } from '~/shared/store/app-slice';
import { RecipeCardList } from '~/shared/ui/RecipeCardList';
import { FoundRecipes } from '~/widgets/foundRecipes';
import { RelevantKitchen } from '~/widgets/RelevantKitchen';
import { SearchPanel } from '~/widgets/SearchPanel';

export const CuisinePage = () => {
    const dispatch = useDispatch();

    const countOfSearchedRecipes = useSelector(selectCountSearchedRecipes);
    const isSearchActive = useSelector(selectIsSearchActive);

    const { category: urlCategory, subcategory: urlSubcategory } = useParams();

    const categories = useSelector(selectMainCategories);
    const subcategories = useSelector(selectSubCategories);

    const pageMainCategory = categories.find((c) => c.category === urlCategory);
    const pageSubcategory = subcategories.find((c) => c.category === urlSubcategory);

    const { data, isFetching } = useGetRecipeBySubategoryQuery(
        {
            subcategoryId: pageSubcategory?._id ?? '',
            limit: RECIPES_LIMITS.DEFAULT,
        },
        {
            skip: !pageMainCategory,
        },
    );
    const recipes = data?.data;

    useEffect(() => {
        dispatch(setPageLoader(isFetching));
    }, [isFetching, dispatch]);

    return (
        <Flex justifyContent='center' direction='column' style={{ scrollbarGutter: 'stable' }}>
            <SearchPanel title={pageMainCategory?.title} desc={pageMainCategory?.description} />
            <FoundRecipes cuisinePageFilter={urlCategory} />
            {countOfSearchedRecipes === 0 || !isSearchActive ? (
                <>
                    <Flex justifyContent='center' flexWrap='wrap'>
                        {pageMainCategory?.subCategories.map(({ title, category }, i) => (
                            <Link
                                variant={LINK_VARIANT}
                                key={category}
                                as={NavLink}
                                to={`/${urlCategory}/${category}`}
                                data-test-id={`tab-${category}-${i}`}
                                {...(location.pathname === `/${urlCategory}/${category}`
                                    ? {
                                          'aria-selected': true,
                                      }
                                    : { 'aria-selected': false })}
                            >
                                {title}
                            </Link>
                        ))}
                    </Flex>
                    <RecipeCardList
                        recipes={recipes}
                        marginTop='24px'
                        columns={{ base: 1, xl: 2, lg: 1, md: 2 }}
                        columnGap={{ base: '16px', lg: '24px' }}
                        rowGap='16px'
                    />
                    <Button
                        display='block'
                        margin='0 auto'
                        marginTop='16px'
                        bgColor='lime.400'
                        color='black'
                    >
                        Загрузить еще
                    </Button>
                </>
            ) : null}
            <RelevantKitchen />
        </Flex>
    );
};

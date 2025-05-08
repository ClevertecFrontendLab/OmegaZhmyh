import { Button, Flex, Link } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router';

import { selectMainCategories, selectSubcategories } from '~/entities/Category';
import {
    selectCountSearchedRecipes,
    selectIsSearchActive,
} from '~/features/recipe-filters/model/selectors/searchSelectors';
import { useGetRecipeBySubategoryQuery } from '~/shared/api/yeedaaApi';
import { setPageLoader } from '~/shared/store/app-slice';
import { RecipeCardList } from '~/shared/ui/RecipeCardList';
import { FoundRecipes } from '~/widgets/foundRecipes';
import { RelevantKitchen } from '~/widgets/RelevantKitchen';
import { SearchPanel } from '~/widgets/SearchPanel';

export const CuisinePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const countOfSearchedRecipes = useSelector(selectCountSearchedRecipes);
    const isSearchActive = useSelector(selectIsSearchActive);

    const { category: urlCategory = '', subcategory: urlSubcategory = '' } = useParams<{
        category: string;
        subcategory: string;
    }>();

    const categories = useSelector(selectMainCategories);
    const subcategories = useSelector(selectSubcategories);

    const pageMainCategory = categories.find((c) => c.category === urlCategory);
    const pageSubcategory = subcategories.find((c) => c.category === urlSubcategory);

    const { data, isLoading } = useGetRecipeBySubategoryQuery(pageSubcategory?._id ?? '');
    const recipes = data?.data;

    useEffect(() => {
        dispatch(setPageLoader(isLoading));
    }, [isLoading, dispatch]);

    useEffect(() => {
        if (!pageMainCategory || !pageSubcategory) {
            navigate('/not-found', { replace: true });
            return;
        }
    }, [dispatch, pageSubcategory, pageMainCategory, navigate]);

    return (
        <Flex justifyContent='center' direction='column' style={{ scrollbarGutter: 'stable' }}>
            <SearchPanel title={pageMainCategory?.title} desc={pageMainCategory?.description} />
            <FoundRecipes cuisinePageFilter={urlCategory} />
            {countOfSearchedRecipes == 0 || !isSearchActive ? (
                <>
                    <Flex justifyContent='center' flexWrap='wrap'>
                        {pageMainCategory?.subCategories.map(({ title, category }, i) => (
                            <Link
                                variant='subCategoryTab'
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

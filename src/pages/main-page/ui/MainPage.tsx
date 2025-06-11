import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { useGetRecipesQuery } from '~/entities/recipe/';
import { selectCountSearchedRecipes } from '~/features/recipe-filters';
import { RECIPES_LIMITS } from '~/shared/config/limits.constants';
import { ROUTES } from '~/shared/config/routes.constants';
import { SORT } from '~/shared/config/sort.constants';
import { setError } from '~/shared/store/notificationSlice';
import { RecipeCardList } from '~/shared/ui/recipe-card-list';
import { FoundRecipes } from '~/widgets/founded-recipes';
import { NewRecipes } from '~/widgets/new-recipes';
import { RelevantKitchen } from '~/widgets/relevant-kitchen';
import { SearchPanel } from '~/widgets/search-panel';

import { BlogsPreview } from './BlogsPreview';

export const MainPage = () => {
    const dispatch = useDispatch();

    const countOfSearchedRecipes = useSelector(selectCountSearchedRecipes);

    const { data, isError } = useGetRecipesQuery({
        limit: RECIPES_LIMITS.DEFAULT,
        sortBy: SORT.BY.LIKES,
        sortOrder: SORT.ORDER.DESC,
    });
    const theJuiciestRecipes = data?.data;

    useEffect(() => {
        if (isError) {
            dispatch(
                setError({
                    title: 'Не удалось загрузить самые сочные рецепты',
                    message: 'Попробуйте поискать снова попозже',
                }),
            );
        }
    }, [isError, dispatch]);

    return (
        <Box>
            <SearchPanel title='Приятного аппетита!' />
            <FoundRecipes />
            {countOfSearchedRecipes && countOfSearchedRecipes > 0 ? null : (
                <>
                    <NewRecipes />
                    <Flex
                        justifyContent='space-between'
                        alignItems='end'
                        display={theJuiciestRecipes?.length ? 'flex' : 'none'}
                        marginTop={{ base: '32px', lg: '40px' }}
                    >
                        <Text fontSize={{ base: '2xl', lg: '4xl' }} fontWeight={{ base: 'medium' }}>
                            Самое сочное
                        </Text>
                        <Box
                            display={{ base: 'none', lg: 'flex' }}
                            visibility={{ base: 'hidden', lg: 'visible' }}
                            data-test-id='juiciest-link'
                        >
                            <Link to='/the-juiciest'>
                                <Button
                                    color='black'
                                    bgColor='lime.400'
                                    size='md'
                                    fontWeight='semibold'
                                    rightIcon={<ArrowForwardIcon />}
                                    justifySelf='center'
                                    _hover={{ bgColor: 'lime.50' }}
                                >
                                    Вся подборка
                                </Button>
                            </Link>
                        </Box>
                    </Flex>
                    <RecipeCardList
                        recipes={theJuiciestRecipes}
                        columns={{ base: 1, xl: 2, lg: 1, md: 2 }}
                        columnGap={{ base: '16px', xl: '24px' }}
                        rowGap={{ base: '12px', md: '16px', xl: '24px' }}
                        mt={{ base: '12px' }}
                    />
                    <Flex
                        display={{ base: 'flex', lg: 'none' }}
                        visibility={{ base: 'visible', lg: 'hidden' }}
                        justifyContent='center'
                        data-test-id='juiciest-link-mobile'
                    >
                        <Link to={ROUTES.THE_JUICIEST}>
                            <Button
                                margin='12px auto 0 auto'
                                color='black'
                                bgColor='lime.400'
                                fontWeight='semibold'
                                size='md'
                                rightIcon={<ArrowForwardIcon />}
                                justifySelf='center'
                                _hover={{ bgColor: 'lime.50' }}
                            >
                                Вся подборка
                            </Button>
                        </Link>
                    </Flex>
                    <BlogsPreview />
                </>
            )}
            <RelevantKitchen marginTop='40px' />
        </Box>
    );
};

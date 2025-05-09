import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { selectCountSearchedRecipes } from '~/features/recipe-filters';
import { useGetRecipesQuery } from '~/shared/api/yeedaaApi';
import { setPageLoader } from '~/shared/store/app-slice';
import { RecipeCardList } from '~/shared/ui/RecipeCardList';
import { setError } from '~/shared/ui/SnackbarAlert';
import { CookingBlogs } from '~/widgets/CookingBlogs';
import { FoundRecipes } from '~/widgets/foundRecipes';
import { NewRecipes } from '~/widgets/NewRecipes';
import { RelevantKitchen } from '~/widgets/RelevantKitchen';
import { SearchPanel } from '~/widgets/SearchPanel';

export const MainPage = () => {
    const dispatch = useDispatch();

    const countOfSearchedRecipes = useSelector(selectCountSearchedRecipes);

    const { data, isError, isLoading } = useGetRecipesQuery({
        page: 1,
        limit: 8,
        sortBy: 'likes',
        sortOrder: 'desc',
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
        dispatch(setPageLoader(isLoading));
    }, [isError, dispatch, isLoading]);

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
                        marginTop={{ base: '32px', lg: '40px' }}
                    >
                        <Text fontSize={{ base: '2xl', lg: '4xl' }} fontWeight={{ base: 'medium' }}>
                            Самое сочное
                        </Text>
                        <Box
                            display={{ base: 'none', md: 'flex' }}
                            visibility={{ base: 'hidden', md: 'visible' }}
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
                        display={{ base: 'flex', md: 'none' }}
                        visibility={{ base: 'visible', md: 'hidden' }}
                        justifyContent='center'
                        data-test-id='juiciest-link-mobile'
                    >
                        <Link to='/the-juiciest'>
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
                    <CookingBlogs />
                </>
            )}
            <RelevantKitchen marginTop='40px' />
        </Box>
    );
};

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { CookingBlog } from '~/entities/CookingBlog';
import { selectCountSearchedRecipes } from '~/features/recipe-filters';
import { useGetTheJuiciestRecipeQuery } from '~/shared/api/yeedaaApi';
import { setPageLoader } from '~/shared/store/app-slice';
import { RecipeCardList } from '~/shared/ui/RecipeCardList';
import { setError } from '~/shared/ui/SnackbarAlert';
import { FoundRecipes } from '~/widgets/foundRecipes';
import { NewRecipes } from '~/widgets/NewRecipes';
import { RelevantKitchen } from '~/widgets/RelevantKitchen';
import { SearchPanel } from '~/widgets/SearchPanel';

export const MainPage = () => {
    const dispatch = useDispatch();

    const countOfSearchedRecipes = useSelector(selectCountSearchedRecipes);

    const { data, isError, isLoading } = useGetTheJuiciestRecipeQuery(1);
    const theJuiciestRecipes = data?.data;

    useEffect(() => {
        if (isError) {
            dispatch(setError('Не удалось загрузить самые сочные рецепты'));
        }
        dispatch(setPageLoader(isLoading));
    }, [isError, dispatch, isLoading]);

    return (
        <Box>
            <SearchPanel title='Приятного аппетита!' />
            <FoundRecipes />
            {countOfSearchedRecipes == 0 ? (
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
                    <Box
                        bgColor='lime.300'
                        padding={{ base: '12px', lg: '24px' }}
                        marginTop={{ base: '32px', lg: '40px' }}
                        borderRadius={16}
                    >
                        <Flex justifyContent='space-between'>
                            <Text fontSize={{ base: '2xl' }} fontWeight='medium' lineHeight='32px'>
                                Кулинарные блоги
                            </Text>
                            <Button
                                rightIcon={<ArrowForwardIcon />}
                                variant='ghost'
                                fontSize='xl'
                                fontWeight='semibold'
                                display={{ base: 'none', lg: 'flex' }}
                                _hover={{ bgColor: 'lime.50' }}
                            >
                                Все авторы
                            </Button>
                        </Flex>
                        <Flex
                            gap={{ base: '12px', lg: '16px' }}
                            marginTop={{ base: '12px', lg: '24px' }}
                            flexDirection={{ base: 'column', md: 'row' }}
                        >
                            <CookingBlog
                                userName='Елена Высоцкая'
                                accountName='@elenapovar'
                                avatarImg='ElenaVysotskayaImg'
                                text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                            />
                            <CookingBlog
                                userName='Alex Cook'
                                accountName='@funtasticooking'
                                avatarImg='AlexCookImg'
                                text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                            />
                            <CookingBlog
                                userName='Екатерина Константинопольская'
                                accountName='@bake_and_pie'
                                avatarImg='CatherineConstantinopleImg'
                                text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                            />
                        </Flex>
                        <Button
                            display={{ base: 'flex', lg: 'none' }}
                            margin={{ base: '12px auto 0 auto' }}
                            rightIcon={<ArrowForwardIcon />}
                            variant='ghost'
                            fontSize='xl'
                            fontWeight='semibold'
                            _hover={{ bgColor: 'lime:50' }}
                        >
                            Все авторы
                        </Button>
                    </Box>
                </>
            ) : null}
            <RelevantKitchen marginTop='40px' />
        </Box>
    );
};

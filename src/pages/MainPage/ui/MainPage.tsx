import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { CookingBlog } from '~/entities/CookingBlog';
import { RecipeCard } from '~/features/RecipeCard';
import { NewRecipes } from '~/widgets/NewRecipes';
import { RelevantKitchen } from '~/widgets/RelevantKitchen';
import { SearchPanel } from '~/widgets/SearchPanel';

import { MainCardList } from '../model/MainCardList';

export const MainPage = () => (
    <Box>
        <SearchPanel title='Приятного аппетита!' />
        <NewRecipes />
        <Flex justifyContent='space-between' alignItems='end' mt={{ base: '32px' }}>
            <Text fontSize={{ base: '2xl', lg: '4xl' }} fontWeight={{ base: 'medium' }}>
                Самое сочное
            </Text>
            <Box
                display={{ base: 'none', lg: 'flex' }}
                visibility={{ base: 'hidden', lg: 'visible' }}
                data-test-id='juiciest-link'
            >
                <Link to='/Juiciest'>
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
        <SimpleGrid
            columns={{ base: 1, xl: 2, lg: 1, md: 2 }}
            columnGap='24px'
            rowGap={{ base: '12px', md: '14px' }}
            mt={{ base: '12px' }}
        >
            {MainCardList.map((cardInfo) => (
                <RecipeCard
                    key={cardInfo.title}
                    image={cardInfo.image}
                    repostCount={cardInfo.repostCount}
                    likeCount={cardInfo.likeCount}
                    tagType={cardInfo.tagType}
                    recomendationLabel={cardInfo.recomendationLabel}
                    recomendationIcon={cardInfo.recomendationIcon}
                    title={cardInfo.title}
                    description={cardInfo.description}
                />
            ))}
        </SimpleGrid>
        <Flex
            display={{ base: 'flex', lg: 'none' }}
            visibility={{ base: 'visible', lg: 'hidden' }}
            justifyContent='center'
            data-test-id='juiciest-link-mobile'
        >
            <Link to='/Juiciest'>
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
        <Box bgColor='lime.300' padding={{ base: '12px', lg: '24px' }} mt='32px' borderRadius={16}>
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
        <RelevantKitchen
            marginTop='40px'
            title='Веганская кухня'
            description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            card1={{
                title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
                description:
                    'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
                tagType: 'Вторые блюда',
                likeCount: 1,
                repostCount: 1,
            }}
            card2={{
                title: 'Капустные котлеты',
                description:
                    'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
                tagType: 'Вторые блюда',
                likeCount: 2,
                repostCount: 1,
            }}
            miniCardText1='Стейк для вегетарианцев'
            miniCardText2='Котлеты из гречки и фасоли'
            miniCardText3='Сырный суп с лапшой и брокколи'
        />
    </Box>
);

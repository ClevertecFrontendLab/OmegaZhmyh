import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, SimpleGrid } from '@chakra-ui/react';

import { CookingBlog } from '~/entities/CookingBlog';
import { RecipeCard } from '~/features/RecipeCard';
import { NewRecipes } from '~/widgets/NewRecipes';
import { RelevantKitchen } from '~/widgets/RelevantKitchen';
import { SearchPanel } from '~/widgets/SearchPanel';

import { MainCardList } from '../model/MainCardList';

//import { MostTenderCardList } from '../model/MostTenderCardList';

export const MainPage = () => (
    <Flex
        justifyContent='center'
        direction='column'
        padding='32px 24px 0 24px'
        style={{ scrollbarGutter: 'stable' }}
    >
        <SearchPanel title='Самое сочное' />
        <NewRecipes />
        <SimpleGrid
            columns={{ base: 1, xl: 2, lg: 1, md: 2 }}
            columnGap='24px'
            rowGap='16px'
            mt={10}
        >
            {MainCardList.map((cardInfo) => (
                <RecipeCard
                    image={cardInfo.image}
                    repostCount={cardInfo.repostCount}
                    likeCount={cardInfo.likeCount}
                    tagType={cardInfo.tagType}
                    recomendationLabel={cardInfo.recomendationLabel}
                    title={cardInfo.title}
                    description={cardInfo.description}
                />
            ))}
        </SimpleGrid>
        <Box bgColor='lime.300' padding={{ lg: '24px', base: '12px' }} mt={10} borderRadius={16}>
            <Flex justifyContent='space-between'>
                <Heading fontWeight='normal'>Кулинарные блоги</Heading>
                <Button
                    rightIcon={<ArrowForwardIcon />}
                    variant='ghost'
                    fontSize='xl'
                    fontWeight='semibold'
                >
                    Все авторы
                </Button>
            </Flex>
            <Flex gap={4} marginTop={6}>
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
    </Flex>
);

import { Box, Grid, Text } from '@chakra-ui/react';

import { BsArrowLeft, BsArrowRight } from '~/shared/ui/Icons';
import { TextTagCard } from '~/shared/ui/TextTagCard';

export const NewRecipes = () => (
    <Box marginTop={{ base: '32px', lg: '40px' }}>
        <Text fontSize={{ base: '2xl', lg: '4xl' }} fontWeight='medium'>
            Новые рецепты
        </Text>
        <Box position='relative'>
            <Grid
                gap={{ base: '12px', xl: '24px' }}
                templateRows={{ base: '220px', lg: '402px', xl: '414px' }}
                marginTop={{ base: '12px' }}
                autoColumns={{ base: '158px', lg: '277px', xl: '322px' }}
                autoFlow='column'
                overflow='hidden'
            >
                <TextTagCard
                    title='Солянка с грибами'
                    description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    tagType='Первые блюда'
                    tagColor='lime.150'
                    likeCount={0}
                    repostCount={1}
                    image='MushroomSaladImg'
                />
                <TextTagCard
                    title='Капустные котлеты'
                    description='Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.'
                    tagType='Веганская кухня'
                    tagColor='lime.150'
                    likeCount={1}
                    repostCount={2}
                    image='CabbageCutletsImg'
                />
                <TextTagCard
                    title='Оладьи на кефире "Пышные"'
                    description='Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.'
                    tagType='Детские блюда'
                    tagColor='lime.150'
                    likeCount={1}
                    repostCount={0}
                    image='PancakesRollImg'
                />
                <TextTagCard
                    title='Салат "Здоровье"'
                    description='Сельдерей очень полезен для здоровья, пора набираться витаминов. Не  салат, а сплошное удовольствие:) Вкусный, необычный, а главное быстрый.'
                    tagType='Вторые блюда'
                    tagColor='lime.150'
                    likeCount={0}
                    repostCount={0}
                    image='SaladImg'
                />
                <TextTagCard
                    title='Картошка, тушенная с болгарским перцем и фасолью в томатном соусе'
                    description='Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.'
                    tagType='Вторые блюда'
                    tagColor='lime.150'
                    likeCount={1}
                    repostCount={1}
                    image='GarlicPotatoImg'
                />
            </Grid>
            <BsArrowLeft />
            <BsArrowRight />
        </Box>
    </Box>
);

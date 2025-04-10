import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Grid, IconButton, Text } from '@chakra-ui/react';

import { TextTagCard } from '~/shared/ui/TextTagCard';

export const NewRecipes = () => (
    <Box marginTop='30px'>
        <Text fontSize={{ base: '2xl', lg: '4xl' }} fontWeight='medium'>
            Новые рецепты
        </Text>
        <Box position='relative'>
            <IconButton
                top='50%'
                left='-8px'
                transform='translateY(-50%)'
                aria-label='corousel back'
                icon={<ArrowBackIcon />}
                position='absolute'
                bgColor='black'
                color='lime.50'
                zIndex='tooltip'
            />
            <IconButton
                top='50%'
                right='-8px'
                transform='translateY(-50%)'
                aria-label='corousel forward'
                icon={<ArrowForwardIcon />}
                position='absolute'
                bgColor='black'
                color='lime.50'
                zIndex='tooltip'
            />
            <Grid
                gap={3}
                templateRows='1fr'
                marginTop={{ base: '12px' }}
                autoColumns={{ base: '158px', xl: '322px', lg: '277px' }}
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
        </Box>
    </Box>
);

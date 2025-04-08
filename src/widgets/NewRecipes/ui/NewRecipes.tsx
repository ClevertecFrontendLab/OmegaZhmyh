import { Box, Grid, Heading, HStack } from '@chakra-ui/react';

import { TextTagCard } from '~/shared/ui/TextTagCard';

export const NewRecipes = () => (
    <Box>
        <Heading>Новые рецепты</Heading>
        <HStack>
            <Grid
                gap={3}
                templateRows='1fr'
                autoColumns={{ xl: '322px', lg: '277px' }}
                autoFlow='column'
            >
                <TextTagCard
                    title='Картошка, тушенная с болгарским перцем и фасолью в томатном соусе'
                    description='Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.'
                    tagType='Вторые блюда'
                    likeCount={1}
                    repostCount={1}
                    image='GarlicPotatoImg'
                />
            </Grid>
        </HStack>
    </Box>
);

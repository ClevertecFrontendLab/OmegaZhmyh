import { Button, Grid, Text } from '@chakra-ui/react';

import { MainCategory } from '~/entities/Category';
import { Recipe } from '~/entities/Recipe';
import { getImgUrlPath } from '~/shared/utils/getUrlPath';

type TextCardProps = {
    recipe: Recipe;
    category: MainCategory;
};

export const TextCard = (props: TextCardProps) => {
    const { recipe, category } = props;
    return (
        <Grid
            templateColumns='auto 1fr auto'
            gap={2}
            alignItems='center'
            padding={{ xl: '12px 24px', base: '10px 12px' }}
            outline='1px solid'
            outlineColor='blackAlpha.200'
            borderRadius='8px'
        >
            <img src={getImgUrlPath(category.icon)}></img>
            <Text
                fontWeight='medium'
                fontSize={{ base: 'md', lg: 'lg' }}
                noOfLines={1}
                wordBreak='break-all'
                style={{ wordWrap: 'break-word' }}
            >
                {recipe.title}
            </Text>
            <Button size={{ base: 'sm' }} variant='outline' colorScheme='lime'>
                Готовить
            </Button>
        </Grid>
    );
};

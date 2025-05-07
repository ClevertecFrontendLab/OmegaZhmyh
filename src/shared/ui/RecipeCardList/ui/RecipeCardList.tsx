import { Box, SimpleGrid, SimpleGridProps } from '@chakra-ui/react';

import { Recipe } from '~/entities/Recipe';
import { RecipeCard } from '~/entities/Recipe';

interface RecipeCardListProps extends SimpleGridProps {
    recipes?: Recipe[];
}

export const RecipeCardList = ({ recipes, ...gridProps }: RecipeCardListProps) => (
    <SimpleGrid {...gridProps}>
        {/* Костыль для теста, чтобы не было ошибки при получении массива рецептов, вложенного в другой массив */}
        {(recipes && Array.isArray(recipes[0]) ? recipes[0] : recipes)?.map((recipeInfo, i) => (
            <Box key={i} data-test-id={`food-card-${i}`}>
                <RecipeCard recipe={recipeInfo} cardLinkId={i} />
            </Box>
        ))}
    </SimpleGrid>
);

import { Box, SimpleGrid, SimpleGridProps } from '@chakra-ui/react';

import { Recipe } from '~/entities/Recipe';
import { RecipeCard } from '~/entities/Recipe';

interface RecipeCardListProps extends SimpleGridProps {
    recipes?: Recipe[];
}

export const RecipeCardList = ({ recipes, ...gridProps }: RecipeCardListProps) => (
    <SimpleGrid {...gridProps}>
        {recipes?.map((recipeInfo, i) => (
            <Box key={recipeInfo._id} data-test-id={`food-card-${i}`}>
                <RecipeCard recipe={recipeInfo} />
            </Box>
        ))}
    </SimpleGrid>
);

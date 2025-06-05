import { Box, SimpleGrid, SimpleGridProps } from '@chakra-ui/react';

import { Recipe } from '~/entities/recipe';
import { RecipeCard } from '~/entities/recipe';

type RecipeCardListProps = SimpleGridProps & {
    recipes?: Recipe[];
};

export const RecipeCardList = ({ recipes, ...gridProps }: RecipeCardListProps) => (
    <SimpleGrid {...gridProps}>
        {recipes?.map((recipeInfo, i) => (
            <Box key={i} data-test-id={`food-card-${i}`}>
                <RecipeCard recipe={recipeInfo} cardLinkId={i} />
            </Box>
        ))}
    </SimpleGrid>
);

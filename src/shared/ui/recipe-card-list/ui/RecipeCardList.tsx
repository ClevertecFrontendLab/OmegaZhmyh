import { Box, SimpleGrid, SimpleGridProps } from '@chakra-ui/react';

import { Recipe } from '~/entities/recipe';
import { RecipeCard } from '~/entities/recipe';

type RecipeCardListProps = SimpleGridProps & {
    recipes?: Recipe[];
    dataTestId?: string;
};

export const RecipeCardList = ({ recipes, dataTestId, ...gridProps }: RecipeCardListProps) => (
    <SimpleGrid {...gridProps} data-test-id={dataTestId}>
        {recipes?.map((recipeInfo, i) => (
            <Box key={i} data-test-id={`food-card-${i}`}>
                <RecipeCard recipe={recipeInfo} cardLinkId={i} />
            </Box>
        ))}
    </SimpleGrid>
);

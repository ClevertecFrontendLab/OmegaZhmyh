import { Box, SimpleGrid, SimpleGridProps } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { RecipeCard } from '~/entities/Recipe';
import { selectSerchedRecipes } from '~/features/recipe-filters';

interface RecipeCardListProps extends SimpleGridProps {}

export const RecipeCardList = ({ ...gridProps }: RecipeCardListProps) => {
    const recipes = useSelector(selectSerchedRecipes);
    return (
        <SimpleGrid {...gridProps}>
            {recipes.map((recipeInfo, i) => (
                <Box key={recipeInfo.id} data-test-id={`food-card-${i}`}>
                    <RecipeCard recipe={recipeInfo} cardLink={i} />
                </Box>
            ))}
        </SimpleGrid>
    );
};

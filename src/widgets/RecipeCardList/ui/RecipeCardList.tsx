import { Box, SimpleGrid, SimpleGridProps } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RecipeCard } from '~/entities/Recipe';
import { selectSerchedRecipes } from '~/features/recipe-filters';
import { setCountSearchedRecipes } from '~/features/recipe-filters/model/slice';

interface RecipeCardListProps extends SimpleGridProps {}

export const RecipeCardList = ({ ...gridProps }: RecipeCardListProps) => {
    const recipes = useSelector(selectSerchedRecipes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCountSearchedRecipes(recipes.length));
    }, [dispatch, recipes]);

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

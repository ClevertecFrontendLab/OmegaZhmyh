import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { RecipeCard } from '~/entities/Recipe';
import { selectFilteredRecipes } from '~/features/recipe-filters';

interface RecipeCardListProps extends SimpleGridProps {}

export const RecipeCardList = ({ ...gridProps }: RecipeCardListProps) => {
    const recipes = useSelector(selectFilteredRecipes);
    return (
        <SimpleGrid {...gridProps}>
            {recipes.map((recipeInfo) => (
                <RecipeCard
                    key={recipeInfo.title}
                    image={recipeInfo.image}
                    repostCount={recipeInfo.bookmarks}
                    likeCount={recipeInfo.likes}
                    title={recipeInfo.title}
                    description={recipeInfo.description}
                />
            ))}
        </SimpleGrid>
    );
};

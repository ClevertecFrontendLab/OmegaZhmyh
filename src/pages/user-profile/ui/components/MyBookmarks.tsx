import { Box, Text } from '@chakra-ui/react';

import { Recipe, RecipeCard } from '~/entities/recipe';
import { ToggleBookmarkButton } from '~/features/bookmark';
import { RecipeCardBox } from '~/widgets/recipe-card-box';

export const MyBookmarks = ({ recipes }: { recipes: Recipe[] }) => {
    const recipesCards = recipes.map((recipe) => (
        <RecipeCard
            key={recipe._id}
            recipe={recipe}
            actions={<ToggleBookmarkButton id={recipe._id} />}
        />
    ));
    return (
        <Box>
            <Text alignSelf='start' fontSize={{ base: 'xl', lg: '4xl' }}>
                Мои закладки <span data-test-id='blogger-user-notes-count'>({recipes.length})</span>
            </Text>
            <RecipeCardBox cards={recipesCards} isFetchingRecipes={false} />
        </Box>
    );
};

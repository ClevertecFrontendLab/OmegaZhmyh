import { Box, HStack, Text } from '@chakra-ui/react';

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
            <HStack
                fontSize={{ base: 'lg', lg: 'xl' }}
                alignSelf='start'
                mt={{ base: '32px', lg: '40px' }}
            >
                <Text fontWeight='bold'>Мои закладки</Text>
                <Text color='blackAlpha.600' data-test-id='blogger-user-notes-count'>
                    ({recipes.length})
                </Text>
            </HStack>
            <RecipeCardBox cards={recipesCards} isFetchingRecipes={false} mt='16px' />
        </Box>
    );
};

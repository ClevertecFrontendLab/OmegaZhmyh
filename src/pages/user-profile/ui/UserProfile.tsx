import { Box, HStack, Text } from '@chakra-ui/react';

import { DraftCard, RecipeCard, RecipeCardEditButton } from '~/entities/recipe';
import { useGetRecipeByUserIdQuery } from '~/entities/recipe/api/recipeApi';
import { useGetUserQuery } from '~/entities/user';
import { BLOG_NOTES_LIMIT } from '~/shared/config';
import { BlogNotesBox } from '~/widgets/note-card-box';
import { RecipeCardBox } from '~/widgets/recipe-card-box';

import { MyBookmarks } from './components/MyBookmarks';
import { UserProfileHeader } from './components/UserProfileHeader';

export const UserProfile = () => {
    const { data: user, isFetching } = useGetUserQuery();
    const { data: recipesData } = useGetRecipeByUserIdQuery(user?._id as string, {
        skip: !user?._id,
    });

    const draftsCards =
        user?.drafts?.map((draft) => (
            <Box key={draft._id}>
                <DraftCard
                    title={draft.title}
                    description={draft.description}
                    image={draft.image}
                    id={draft._id}
                />
            </Box>
        )) || [];

    const recipesCards =
        recipesData?.recipes?.map((recipe, i) => (
            <Box key={recipe._id} data-test-id={`food-card-${i}`}>
                <RecipeCard
                    recipe={recipe}
                    cardLinkId={i.toString()}
                    actions={
                        <RecipeCardEditButton
                            categoriesIds={recipe.categoriesIds}
                            recipeId={recipe._id}
                        />
                    }
                />
            </Box>
        )) || [];

    return (
        <Box pt={{ base: '16px', lg: '32px' }} pb={{ base: '16px', lg: '0' }}>
            <UserProfileHeader />
            <HStack>
                <Box>
                    <Text>Мои рецепты</Text>
                    <Text>(10)</Text>
                </Box>
                <Box>
                    <Text>Черновики</Text>
                    <Text>(10)</Text>
                </Box>
            </HStack>
            <RecipeCardBox
                cards={[...draftsCards, ...recipesCards]}
                isFetchingRecipes={isFetching}
            />
            <BlogNotesBox limit={BLOG_NOTES_LIMIT} canAddNotes notes={user?.notes || []} />

            <MyBookmarks recipes={recipesData?.myBookmarks || []} />
        </Box>
    );
};

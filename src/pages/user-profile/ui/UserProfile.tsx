import { Box, HStack, Text } from '@chakra-ui/react';

import { useGetRecipeByUserIdQuery } from '~/entities/recipe/api/recipeApi';
import { useGetUserQuery } from '~/entities/user';
import { RecipeCardBox } from '~/widgets/recipe-card-box';

import { UserProfileHeader } from './components/UserProfileHeader';

export const UserProfile = () => {
    const { data: user, isFetching } = useGetUserQuery();
    const { data: recipesData } = useGetRecipeByUserIdQuery(user?._id as string, {
        skip: !user?._id,
    });

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
                recipes={recipesData}
                drafts={user?.drafts}
                isFetchingRecipes={isFetching}
            />
        </Box>
    );
};

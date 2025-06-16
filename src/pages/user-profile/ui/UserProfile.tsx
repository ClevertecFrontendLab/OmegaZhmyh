import { Box, HStack, Text } from '@chakra-ui/react';

import { useGetUserQuery } from '~/entities/user';

import { UserProfileHeader } from './components/UserProfileHeader';

export const UserProfile = () => {
    const { data: user } = useGetUserQuery();
    console.log(user);
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
        </Box>
    );
};

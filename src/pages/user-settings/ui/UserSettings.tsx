import { Avatar, Box, Text } from '@chakra-ui/react';

// eslint-disable-next-line arrow-body-style
export const UserSettings = () => {
    return (
        <Box
            pt={{ base: '16px', lg: '24px' }}
            pb={{ base: 'calc(16px + var(--mobile-footer-height))', lg: '0' }}
        >
            <Text fontSize={{ base: 'lg', lg: 'xl' }} fontWeight='bold'>
                Авторизация и персонализация
            </Text>
            <Avatar size={{ base: 'xl', lg: '2xl' }} mt='16px' />
        </Box>
    );
};

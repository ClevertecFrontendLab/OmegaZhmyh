import { Box, Text } from '@chakra-ui/react';

import { AvatarSetting } from '~/features/change-avatar';

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
            <AvatarSetting />
        </Box>
    );
};

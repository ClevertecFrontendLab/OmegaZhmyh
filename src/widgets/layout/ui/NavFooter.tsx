import { Button, Stack, Text } from '@chakra-ui/react';

import { BiLogOut } from '~/shared/ui/Icons';

export const NavFooter = () => (
    <Stack
        paddingX='24px'
        paddingBottom='32px'
        spacing={4}
        align='start'
        justifyContent='space-between'
        as='footer'
    >
        <Text fontSize='xs' color='blackAlpha.400'>
            Версия программы 03.25
        </Text>
        <Text fontSize='xs' color='blackAlpha.700'>
            Все права защищены,
            <br /> ученический файл,
            <br /> ©Клевер Технолоджи, 2025
        </Text>
        <Button fontSize='xs' leftIcon={<BiLogOut />} variant='ghost' aria-label='Выйти' size='xs'>
            Выйти
        </Button>
    </Stack>
);

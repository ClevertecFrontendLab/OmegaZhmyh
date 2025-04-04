import { Search2Icon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';

export const MobileFooter = () => (
    <Flex
        height='var(--mobile-footer-height)'
        width='100%'
        bgColor='lime.50'
        display={{ base: 'flex', md: 'none' }}
    >
        <IconButton aria-label='Главная'></IconButton>
        <IconButton aria-label='Поиск' icon={<Search2Icon />}></IconButton>
        <IconButton aria-label='Записать'></IconButton>
        <IconButton aria-label='Мой профиль'></IconButton>
    </Flex>
);

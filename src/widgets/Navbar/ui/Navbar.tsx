import { Accordion, Box, Button, Stack, Text } from '@chakra-ui/react';

import ExitIcon from '~/shared/assets/exit-icon.svg';
import { FoodCategory } from '~/shared/ui/FoodCategory';

export const Navbar = ({ ...props }) => (
    <Box
        width='256px'
        height='calc(100vh - var(--header-height))'
        paddingTop='24px'
        boxShadow='0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)'
        display={{ base: 'none', lg: 'block' }}
        {...props}
    >
        <Accordion
            allowMultiple
            height='calc(100vh - var(--header-height) - var(--footer-left-height) - 24px)'
            paddingTop='10px'
            paddingLeft='10px'
            overflow='auto'
            style={{ scrollbarGutter: 'stable' }}
            clipPath='inset(0 round 12px)'
            boxShadow='0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        >
            <FoodCategory />
        </Accordion>
        <Stack height='var(--footer-left-height)' paddingX='24px' spacing={4} align='start'>
            <Text fontSize='xs' color='blackAlpha.400'>
                Версия программы 03.25
            </Text>
            <Text fontSize='xs' color='blackAlpha.700'>
                Все права защищены,
                <br /> ученический файл,
                <br /> ©Клевер Технолоджи, 2025
            </Text>
            <Button
                fontSize='xs'
                leftIcon={<img src={ExitIcon} />}
                variant='ghost'
                aria-label='Выйти'
                size='xs'
            >
                Выйти
            </Button>
        </Stack>
    </Box>
);

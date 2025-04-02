import { Accordion, Box } from '@chakra-ui/react';

import { FoodCategory } from '~/shared/ui/FoodCategory';

export const Navbar = () => (
    <Box
        width='256px'
        height='calc(100vh - var(--header-height))'
        padding='10px 16px 10px 10px'
        overflow='auto'
    >
        <Accordion allowMultiple>
            <FoodCategory />
        </Accordion>
    </Box>
);

import { Accordion, Box } from '@chakra-ui/react';

import { FoodCategory } from '~/shared/ui/FoodCategory';

export const Navbar = ({ ...props }) => (
    <Box
        width='260px'
        height='calc(100vh - var(--header-height))'
        padding='10px 0 10px 10px'
        overflow='auto'
        style={{ scrollbarGutter: 'stable' }}
        boxShadow='0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)'
        {...props}
    >
        <Accordion
            allowMultiple
            clipPath='inset(0 round 12px)'
            boxShadow='0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        >
            <FoodCategory />
        </Accordion>
    </Box>
);

import { drawerAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const burger = definePartsStyle({
    dialog: {
        bg: `rgba(0,0,0,0)`,
        maxWidth: '352px',
        boxShadow: 'none',
    },
    body: {
        padding: '0',
    },
});

export const drawerTheme = defineMultiStyleConfig({
    variants: { burger },
});

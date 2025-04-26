import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const burger = definePartsStyle({
    dialogContainer: { zIndex: 'overlay', justifyContent: 'end', alignItems: 'start' },
    closeButton: { zIndex: 'overlay' },
    overlay: { zIndex: 'overlay' },
    dialog: {
        bg: `rgba(0,0,0,0)`,
        maxWidth: '352px',
        boxShadow: 'none',
        zIndex: 'overlay',
    },
    body: {
        padding: '0',
    },
});

export const modalTheme = defineMultiStyleConfig({
    variants: { burger },
});

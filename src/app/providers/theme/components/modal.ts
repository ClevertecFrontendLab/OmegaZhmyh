import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
    dialog: {
        gap: '32px',
        alignItems: 'stretch',
        p: '32px',
        borderRadius: '16px',
        maxW: { base: '316px', lg: '396px' },
    },
});

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
        '::-webkit-scrollbar': {
            width: '0px',
        },
    },
});

export const modalTheme = defineMultiStyleConfig({
    baseStyle,
    variants: { burger },
});

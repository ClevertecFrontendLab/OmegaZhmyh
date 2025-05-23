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
        padding: 0,
    },
    body: {
        padding: 0,
        '::-webkit-scrollbar': {
            width: '0px',
        },
    },
});

const authModal = definePartsStyle({
    dialog: {
        alignItems: 'stretch',
        p: '32px',
        borderRadius: '16px',
        maxW: { base: '316px', lg: '396px' },
    },
    overlay: {
        backdropFilter: 'blur(4px)',
        background: 'rgba(0, 0, 0, 0.16)',
    },
    dialogContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const modalTheme = defineMultiStyleConfig({
    variants: { burger, authModal },
});

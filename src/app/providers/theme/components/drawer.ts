import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const drawer = definePartsStyle({
    closeButton: {
        top: '36px',
        right: '32px',
    },
    footer: {
        padding: '0',
        justifyContent: 'end',
        gap: '8px',
    },
    body: {
        '::-webkit-scrollbar': {
            width: '0px',
        },
    },
});

export const drawerTheme = defineMultiStyleConfig({
    variants: { drawer },
});

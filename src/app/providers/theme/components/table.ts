import { tableAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    tableAnatomy.keys,
);

const baseStyle = definePartsStyle({
    th: {
        color: 'lime.600',
        fontSize: 'xs',
        paddingTop: 'none',
        paddingBottom: 'none',
        paddingInlineEnd: 'none',
        paddingInlineStart: 'none',
        padding: { base: '10px 0px 10px 8px', md: '10px 0px 10px 24px' },
    },
    td: {
        color: 'blackAlpha.900',
        fontSize: 'sm',
        paddingTop: 'none',
        paddingBottom: 'none',
        paddingInlineEnd: 'none',
        paddingInlineStart: 'none',
        padding: { base: '10px 12px 10px 8px', md: '10px 24px' },
    },
    tr: {},
});

export const tableTheme = defineMultiStyleConfig({ baseStyle });

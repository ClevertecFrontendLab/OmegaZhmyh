import { tableAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    tableAnatomy.keys,
);

const baseStyle = definePartsStyle({
    th: { color: 'lime.600', fontSize: 'xs' },
    td: {
        color: 'blackAlpha.900',
        fontSize: 'sm',
    },
});

export const tableTheme = defineMultiStyleConfig({ baseStyle });

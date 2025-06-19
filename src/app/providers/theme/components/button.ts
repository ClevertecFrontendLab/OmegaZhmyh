import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const blackSolid = defineStyle({
    bg: 'blackAlpha.900',
    outline: '1px solid',
    outlineColor: 'blackAlpha.200',
    color: 'white',
});

const whiteOutline = defineStyle({
    bg: 'whiteAlpha.100',
    color: 'blackAlpha.800',
    outline: '1px solid',
    outlineColor: 'blackAlpha.600',
});

export const buttonTheme = defineStyleConfig({
    variants: {
        blackSolid,
        whiteOutline,
    },
});

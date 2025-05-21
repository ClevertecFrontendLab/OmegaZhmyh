import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
    mb: '4px',
    fontWeight: 'normal',
});

export const formLabelTheme = defineStyleConfig({
    baseStyle,
});

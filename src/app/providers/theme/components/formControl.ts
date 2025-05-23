import { formAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    formAnatomy.keys,
);

const formControl = definePartsStyle({
    helperText: {
        mt: '4px',
        color: 'blackAlpha.700',
        fontSize: 'xs',
        fontWeight: 'normal',
    },
});

export const formControlTheme = defineMultiStyleConfig({
    baseStyle: formControl,
});

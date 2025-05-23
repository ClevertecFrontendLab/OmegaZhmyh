import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    inputAnatomy.keys,
);

const formField = definePartsStyle({
    field: {
        bgColor: 'white',
        color: 'lime.800',
        border: '1px solid',
        borderColor: 'lime.150',
        _placeholder: { color: 'lime.800' },
        _invalid: {
            borderColor: 'red.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-red-500)',
        },
    },
});

export const inputTheme = defineMultiStyleConfig({
    variants: { formField },
});

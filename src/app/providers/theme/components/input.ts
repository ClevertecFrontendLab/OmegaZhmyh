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
    },
});

export const inputTheme = defineMultiStyleConfig({
    variants: { formField },
});

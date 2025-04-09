import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    cardAnatomy.keys,
);

const baseStyle = definePartsStyle({
    // define the part you're going to style
    /* container: {
        backgroundColor: 'white',
        borderRadius: '8px',
    },
    body: {
        padding: { lg: '20px 24px', base: '8px 8px 4px 24px' },
        gap: '24px',
    }, */
});

const sizes = {
    md: definePartsStyle({
        container: {
            //borderRadius: '0px',
        },
    }),
};

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes });

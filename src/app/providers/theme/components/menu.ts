import { menuAnatomy } from '@chakra-ui/anatomy';
import { Checkbox, createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

// define custom variants
const variants = {
    allergen: {
        icon: {
            as: Checkbox,
        },
    },
};

// export the custom variants in the component theme
export const menuTheme = defineMultiStyleConfig({ variants });

import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    tabsAnatomy.keys,
);

const baseStyle = definePartsStyle((props) => {
    const { colorScheme: c } = props;
    return {
        tablist: {
            color: `${c}.800`,
            fontSize: 'md',
            fontWeight: 'medium',
        },
        tabpanel: {
            padding: '24px 0 40px 0',
        },
    };
});

// export the component theme
export const tabsTheme = defineMultiStyleConfig({ baseStyle });

import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    switchAnatomy.keys,
);

const baseStyle = definePartsStyle((props) => {
    const { colorScheme: c } = props;
    return {
        track: {
            _checked: {
                bg: `${c}.400`,
            },
        },
    };
});

export const switchTheme = defineMultiStyleConfig({ baseStyle });

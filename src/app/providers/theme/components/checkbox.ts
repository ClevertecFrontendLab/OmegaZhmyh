import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(
    checkboxAnatomy.keys,
);

const baseStyle = definePartsStyle((props) => {
    const { colorScheme: c } = props;
    return {
        control: {
            borderColor: `${c}.150`,
            _checked: {
                borderColor: `${c}.400`,
                bgColor: `${c}.400`,
            },
            _disabled: {
                border: 'none',
                bgColor: `${c}.150`,
            },
        },
        icon: {
            color: 'black',
            _disabled: {
                color: 'lime.600',
            },
        },
    };
});

export const checkboxTheme = defineMultiStyleConfig({
    baseStyle,
    defaultProps: {
        colorScheme: 'lime',
    },
});

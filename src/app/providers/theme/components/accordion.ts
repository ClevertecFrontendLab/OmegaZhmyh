import { accordionAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    accordionAnatomy.keys,
);

const navbarVariant = definePartsStyle((props) => {
    const { colorScheme: c } = props;

    return {
        panel: {
            padding: 0,
        },
        container: {
            border: 'none',
            paddingRight: '4px',
        },
        button: {
            padding: '12px 8px',
            gap: '12px',
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'black',
            _expanded: { backgroundColor: `${c}.100` },
        },
        root: {
            allowMultiple: true,
            paddingLeft: '10px',
            overflow: 'auto',
            scrollbarGutter: 'stable',
            '::-webkit-scrollbar': {
                width: { base: '0px', lg: '8px' },
            },
        },
    };
});

const variants = {
    navbar: navbarVariant,
};
export const accordionTheme = defineMultiStyleConfig({ variants });

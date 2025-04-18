import { accordionAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    accordionAnatomy.keys,
);

const navbarVariant = definePartsStyle((props) => {
    const { colorScheme: c } = props; // extract colorScheme from component props

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
            //minHeight: 'calc(100vh - var(--header-height) - var(--footer-left-height) - 35px)',
            //maxHeight: 'calc(100vh - var(--header-height) - var(--footer-left-height) - 34px)',
            paddingLeft: '10px',
            overflow: 'auto',
            scrollbarGutter: 'stable',
        },
    };
});

const variants = {
    navbar: navbarVariant,
};
// export the component theme
export const accordionTheme = defineMultiStyleConfig({ variants });

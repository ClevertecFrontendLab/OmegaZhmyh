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
            height: 'calc(100vh - var(--header-height) - var(--footer-left-height) - 24px)',
            paddingTop: '10px',
            paddingLeft: '10px',
            overflow: 'auto',
            style: { scrollbarGutter: 'stable' },
            clipPath: 'inset(0 round 12px)',
            boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
    };
});

const variants = {
    navbar: navbarVariant,
};
// export the component theme
export const accordionTheme = defineMultiStyleConfig({ variants });

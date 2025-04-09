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

const navbarVariant = definePartsStyle((props) => {
    const { colorScheme: c } = props; // extract colorScheme from component props

    return {
        tab: {
            justifyContent: 'start',
            padding: 0,
            height: 9,
            marginLeft: 10,
            position: 'relative',
            _before: {
                content: '""',
                position: 'absolute',
                height: 6,
                width: 1,
                left: -3,
                background: 'lime.50',
            },
            _selected: {
                fontWeight: 'bold',
                '&::before': {
                    width: 2,
                    left: -4,
                    background: `${c}.300`,
                    transition: 'width 0.2s, left 0.2s',
                },
            },
        },
        tablist: {
            flexDirection: 'column',
        },
        root: {
            orientation: 'vertical',
            gap: 4,
        },
    };
});

const mobileFooterVariant = definePartsStyle((props) => {
    const { colorScheme: c } = props; // extract colorScheme from component props

    return {
        tab: {
            width: '90px',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0',
        },
        tablist: {
            width: '100%',
            height: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        root: {
            height: 'var(--mobile-footer-height)',
            bgColor: `${c}.50`,
            display: { base: 'flex', lg: 'none' },
            position: 'fixed',
            inset: 'auto 0 0 0',
        },
    };
});

const variants = {
    navbar: navbarVariant,
    mobileFooter: mobileFooterVariant,
};
// export the component theme
export const tabsTheme = defineMultiStyleConfig({ baseStyle, variants });

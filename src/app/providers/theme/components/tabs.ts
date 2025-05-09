import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    tabsAnatomy.keys,
);

const baseStyle = definePartsStyle(() => ({
    tablist: {
        fontSize: 'md',
        fontWeight: 'medium',
    },
    tabpanel: {
        padding: '24px 0 40px 0',
    },
}));

const navbarVariant = definePartsStyle((props) => {
    const { colorScheme: c } = props;

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
                height: '28px',
                width: '1px',
                left: '-11px',
                background: `${c}.300`,
            },
            _activeLink: {
                fontWeight: 'bold',
                '&::before': {
                    width: '8px',
                    left: '-18px',
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
    const { colorScheme: c } = props;

    return {
        tab: {
            width: '90px',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0',
            _selected: {
                background:
                    'radial-gradient(62.52% 62.51% at 48.89% 39.5%, #c4ff61 0%, rgba(255, 255, 255, 0) 70%);',
            },
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

export const tabsTheme = defineMultiStyleConfig({ baseStyle, variants });

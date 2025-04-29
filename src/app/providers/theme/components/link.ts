import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const subcategoryLink = defineStyle({
    fontSize: 'md',
    fontWeight: 'medium',
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
        background: `lime.300`,
    },
    _activeLink: {
        fontWeight: 'bold',
        '&::before': {
            width: '8px',
            left: '-18px',
            background: `lime.300`,
            transition: 'width 0.2s, left 0.2s',
        },
    },
});

export const linkTheme = defineStyleConfig({
    variants: { subcategoryLink },
});

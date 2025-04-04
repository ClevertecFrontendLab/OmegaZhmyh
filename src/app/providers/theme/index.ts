import { extendTheme } from '@chakra-ui/react';

import { cardTheme } from './components/card';
import { switchTheme } from './components/switch';
import { tabsTheme } from './components/tabs';

const theme = extendTheme({
    components: { Card: cardTheme, Tabs: tabsTheme, Switch: switchTheme },
    colors: {
        lime: {
            50: '#FFFFD3',
            100: '#defcb2',
            150: '#d7ff94',
            200: '#caf884',
            300: '#b5f554',
            400: '#a1f226',
            500: '#88d90d',
            600: '#69a905',
            700: '#4a7801',
            800: '#2b4800',
            900: '#0b1900',
        },
    },
    breakpoints: {
        base: '0em',
        sm: '360px',
        md: '768px',
        lg: '1440px',
        xl: '1920px',
    },
});

export default theme;

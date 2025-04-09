import { extendTheme } from '@chakra-ui/react';

import { accordionTheme } from './components/accordion';
import { cardTheme } from './components/card';
import { switchTheme } from './components/switch';
import { tabsTheme } from './components/tabs';

const theme = extendTheme({
    components: {
        Card: cardTheme,
        Tabs: tabsTheme,
        Switch: switchTheme,
        Accordion: accordionTheme,
    },
    colors: {
        lime: {
            50: '#FFFFD3',
            100: '#defcb2',
            150: '#d7ff94',
            200: '#caf884',
            300: '#b5f554',
            400: '#b1ff2e',
            500: '#88d90d',
            600: '#2DB100',
            700: '#4a7801',
            800: '#2b4800',
            900: '#0b1900',
        },
    },
    breakpoints: {
        base: '0em',
        sm: '361px',
        md: '769px',
        lg: '1441px',
        xl: '1921px',
    },
});

export default theme;

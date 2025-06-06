import { extendTheme } from '@chakra-ui/react';

import { accordionTheme } from './components/accordion';
import { checkboxTheme } from './components/checkbox';
import { drawerTheme } from './components/drawer';
import { formControlTheme } from './components/formControl';
import { formLabelTheme } from './components/formLabel';
import { inputTheme } from './components/input';
import { linkTheme } from './components/link';
import { modalTheme } from './components/modal';
import { switchTheme } from './components/switch';
import { tableTheme } from './components/table';
import { tabsTheme } from './components/tabs';

const theme = extendTheme({
    components: {
        Switch: switchTheme,
        Tabs: tabsTheme,
        Table: tableTheme,
        Accordion: accordionTheme,
        Checkbox: checkboxTheme,
        Modal: modalTheme,
        Drawer: drawerTheme,
        Link: linkTheme,
        Input: inputTheme,
        Form: formControlTheme,
        FormLabel: formLabelTheme,
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
            800: '#134B00',
            900: '#0b1900',
        },
    },
    breakpoints: {
        base: '0em',
        sm: '360px',
        md: '768px',
        lg: '1440px',
        xl: '1920px',
        '2xl': '1920px',
    },
    sizes: {
        container: {
            lg: '896px',
            xl: '1376px',
        },
    },
});

export default theme;

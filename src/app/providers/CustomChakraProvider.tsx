import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ReactNode } from 'react';

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
    colors: {
        lime: {
            50: '#f2ffde',
            100: '#defcb2',
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
});

export const CustomChakraProvider = ({ children }: { children: ReactNode }) => (
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

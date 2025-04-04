import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

import theme from './theme/index';

export const CustomChakraProvider = ({ children }: { children: ReactNode }) => (
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

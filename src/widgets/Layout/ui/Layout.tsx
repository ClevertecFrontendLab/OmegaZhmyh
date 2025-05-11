import { Container, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { AppLoader } from '~/app/providers/appLoader';
import { SnackbarAlert } from '~/shared/ui/SnackbarAlert';

import { BurgerMenu } from './BurgerMenu';
import { Header } from './Header';
import { MobileFooter } from './MobileFooter';
import { NavBar } from './NavBar';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }: { children: ReactNode }) => (
    <>
        <AppLoader />
        <Header />
        <Flex justifyContent={{ base: 'center', lg: 'space-between' }}>
            <NavBar flexShrink={0} />
            <Container
                as='main'
                marginTop={{ base: 'var(--mobile-header-height)', lg: 'var(--header-height)' }}
                paddingBottom={{ base: 'var(--mobile-footer-height)', lg: '0' }}
                maxW={{
                    xl: 'container.xl',
                    lg: 'calc(100% - var(--navbar-width) - var(--sidebar-width))',
                }}
                paddingX={{ base: '16px', md: '20px' }}
                overflow='hidden'
            >
                {children}
            </Container>
            <SnackbarAlert />
            <Sidebar />
            <BurgerMenu />
        </Flex>
        <MobileFooter />
    </>
);

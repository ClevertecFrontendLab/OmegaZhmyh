import './App.css';

import { Container, Flex } from '@chakra-ui/react';

import { SnackbarAlert } from '~/shared/ui/SnackbarAlert';
import { BurgerMenu, Header, MobileFooter, NavBar, Sidebar } from '~/widgets/Layout';

import { AppRoutes } from './AppRoutes';
import { AppLoader } from './providers/appLoader';

function App() {
    return (
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
                    <AppRoutes />
                </Container>
                <SnackbarAlert />
                <Sidebar />
                <BurgerMenu />
            </Flex>
            <MobileFooter />
        </>
    );
}

export default App;

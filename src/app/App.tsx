import './App.css';

import { Container, Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router';

import { CuisinePage } from '~/pages/CuisinePage';
import { ErrorPage } from '~/pages/ErrorPage';
import { JuiciestPage } from '~/pages/JuiciestPage';
import { MainPage } from '~/pages/MainPage';
import { RecipePage } from '~/pages/RecipePage';
import { CategoryRedirect } from '~/shared/ui/CategoryRedirect';
import { CategoryValidator } from '~/shared/ui/CategoryValidator';
import { SnackbarAlert } from '~/shared/ui/SnackbarAlert';
import { BurgerMenu, Header, MobileFooter, NavBar, Sidebar } from '~/widgets/Layout';

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
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route
                            path='/:category'
                            element={
                                <>
                                    <CategoryValidator />
                                    <CategoryRedirect />
                                </>
                            }
                        />
                        <Route
                            path='/:category/:subcategory'
                            element={
                                <>
                                    <CategoryValidator />
                                    <CuisinePage />
                                </>
                            }
                        />
                        <Route
                            path='/:category/:subcategory/:id'
                            element={
                                <>
                                    <CategoryValidator />
                                    <RecipePage />
                                </>
                            }
                        />
                        <Route path='/the-juiciest' element={<JuiciestPage />} />
                        <Route path='/not-found' element={<ErrorPage />} />
                        <Route path='*' element={<ErrorPage />} />
                    </Routes>
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

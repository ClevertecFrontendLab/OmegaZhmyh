import './App.css';

import { Container, Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router';

import { CuisinePage } from '~/pages/CuisinePage';
import { ErrorPage } from '~/pages/ErrorPage';
import { JuiciestPage } from '~/pages/JuiciestPage';
import { MainPage } from '~/pages/MainPage';
import { RecipePage } from '~/pages/RecipePage';
import { CategoryRedirect } from '~/shared/ui/CategoryRedirect';
import { BurgerMenu, Header, MobileFooter, NavBar, Sidebar } from '~/widgets/Layout';

function App() {
    return (
        <>
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
                        <Route path='/:category' element={<CategoryRedirect />} />
                        <Route path='/:category/:subcategory' element={<CuisinePage />} />
                        <Route path='/:category/:subcategory/:id' element={<RecipePage />} />
                        <Route path='/the-juiciest' element={<JuiciestPage />} />
                        <Route path='*' element={<ErrorPage />} />
                    </Routes>
                </Container>
                <Sidebar />
                <BurgerMenu />
            </Flex>
            <MobileFooter />
        </>
    );
}

export default App;

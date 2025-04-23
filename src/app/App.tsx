import './App.css';

import { Container, Flex } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router';

import { JuiciestPage } from '~/pages/JuiciestPage';
import { MainPage } from '~/pages/MainPage';
import { RecipePage } from '~/pages/RecipePage';
import { VeganCuisinePage } from '~/pages/VeganCuisinePage';
import { BurgerMenu, Header, MobileFooter, NavBar, Sidebar } from '~/widgets/Layout';

function App() {
    return (
        <>
            <Header />
            <Flex justifyContent={{ base: 'center', lg: 'space-between' }}>
                <NavBar flexShrink={0} />
                <Container
                    as='main'
                    marginTop={{ base: 'var(--mobile-header-height)', md: 'var(--header-height)' }}
                    paddingBottom={{ base: 'var(--mobile-footer-height)', lg: '0' }}
                    maxW={{
                        xl: 'container.xl',
                        lg: 'calc(100% - var(--navbar-width) - var(--sidebar-width))',
                    }}
                    paddingX='0'
                    overflow='hidden'
                >
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route
                            path='/:category'
                            element={<Navigate to='/:category/:subcategory' replace />}
                        />
                        <Route path='/:category/:subcategory' element={<VeganCuisinePage />} />
                        <Route path='/:category/:subcategory/:id' element={<RecipePage />} />
                        <Route path='/the-juiciest' element={<JuiciestPage />} />
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

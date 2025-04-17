import './App.css';

import { Container, Flex } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router';

import { JuiciestPage } from '~/pages/JuiciestPage';
import { MainPage } from '~/pages/MainPage';
import { RecipePage } from '~/pages/RecipePage';
import { VeganCuisinePage } from '~/pages/VeganCuisinePage';
import { Header } from '~/widgets/Header';
import { MobileFooter } from '~/widgets/MobileFooter/';
import { Navbar } from '~/widgets/Navbar';
import { Sidebar } from '~/widgets/Sidebar';

function App() {
    return (
        <>
            <Header />
            <Flex justifyContent={{ base: 'center', lg: 'space-between' }}>
                <Navbar flexShrink={0} />
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
                        <Route path='/vegan' element={<Navigate to='/vegan/snacks' replace />} />
                        <Route path='/vegan/*' element={<VeganCuisinePage />} />
                        <Route path='/:category/:subcategory/:id' element={<RecipePage />} />
                        <Route path='/vegan' element={<VeganCuisinePage />} />
                        <Route path='/Juiciest' element={<JuiciestPage />} />
                    </Routes>
                </Container>
                <Sidebar />
            </Flex>
            <MobileFooter />
        </>
    );
}

export default App;

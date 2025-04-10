import './App.css';

import { Container, Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router';

import { JuiciestPage } from '~/pages/JuiciestPage';
import { MainPage } from '~/pages/MainPage';
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
                    marginTop={{ base: 'var(--mobile-header-height)', md: 'var(--header-height)' }}
                    paddingBottom={{ base: 'var(--mobile-footer-height)', lg: '0' }}
                    maxW={{
                        base: 'container.sm',
                        md: 'container.md',
                        lg: 'container.lg',
                        xl: 'container.xl',
                    }}
                    padding={{ lg: 0 }}
                    overflow='hidden'
                >
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/Vegan-cuisine/Main-courses' element={<VeganCuisinePage />} />
                        <Route path='/Vegan-cuisine' element={<VeganCuisinePage />} />
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

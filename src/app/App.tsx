import './App.css';

import { Container, Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router';

import { MainPage } from '~/pages/MainPage';
import { MostTenderPage } from '~/pages/MostTenderPage';
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
                    marginBottom={{ base: 'var(--mobile-footer-height)', md: '0' }}
                    overflow='hidden'
                >
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route
                            path='/Веганская кухня/Вторые блюда'
                            element={<VeganCuisinePage />}
                        />
                        <Route path='/Самое сочное' element={<MostTenderPage />} />
                    </Routes>
                </Container>
                <Sidebar />
            </Flex>
            <MobileFooter />
        </>
    );
}

export default App;

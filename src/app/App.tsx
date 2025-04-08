import './App.css';

import { Flex } from '@chakra-ui/react';
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
                <Flex
                    flexDirection='column'
                    flexGrow={1}
                    maxW={{ lg: '1380px', md: '880px' }}
                    height={{
                        base: 'calc(100vh - var(--header-height) - var(--mobile-footer-height))',
                        lg: 'calc(100vh - var(--header-height))',
                    }}
                    overflow='auto'
                >
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route
                            path='/Веганская кухня/Вторые блюда'
                            element={<VeganCuisinePage />}
                        />
                        <Route path='/Самое сочное' element={<MostTenderPage />} />
                    </Routes>
                </Flex>
                <Sidebar />
            </Flex>
            <MobileFooter />
        </>
    );
}

export default App;

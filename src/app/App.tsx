import './App.css';

import { Flex } from '@chakra-ui/react';

import { SearchPanel } from '~/features/SearchPanel';
import { MainPage } from '~/pages/MainPage';
import { Header } from '~/widgets/Header';
import { Navbar } from '~/widgets/Navbar';

function App() {
    return (
        <>
            <Header />
            <Flex>
                <Navbar />
                <Flex flexDirection='column' flexGrow={1}>
                    <SearchPanel
                        title='Приятного аппетита!'
                        /* desc='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать
                вегетарианскую диету и готовить вкусные вегетарианские блюда.' */
                    />
                    <MainPage />
                </Flex>
            </Flex>
        </>
    );
}

export default App;

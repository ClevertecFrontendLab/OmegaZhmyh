import './index.css';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import App from '~/app/App.tsx';
import { store } from '~/shared/store/configure-store';

import { CustomChakraProvider } from './app/providers/CustomChakraProvider';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <CustomChakraProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </CustomChakraProvider>
    </BrowserRouter>,
);

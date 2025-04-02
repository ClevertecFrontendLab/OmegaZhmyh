import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from '~/app/App.tsx';
import { store } from '~/store/configure-store';

import { CustomChakraProvider } from './app/providers/CustomChakraProvider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CustomChakraProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </CustomChakraProvider>
    </StrictMode>,
);

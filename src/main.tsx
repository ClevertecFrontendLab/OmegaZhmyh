import './index.css';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { store } from '~/shared/store/configure-store';

import { CustomChakraProvider } from './app/providers/CustomChakraProvider';
import { router } from './app/router';

createRoot(document.getElementById('root')!).render(
    <CustomChakraProvider>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </CustomChakraProvider>,
);

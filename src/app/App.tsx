import './App.css';

import { Route, Routes } from 'react-router';

import { AuthPage } from '~/pages/AuthPage';
import { ROUTES } from '~/shared/config/routes';
import { SnackbarAlert } from '~/shared/ui/SnackbarAlert';
import { Layout } from '~/widgets/Layout';
import { BurgerMenu } from '~/widgets/Layout/ui/BurgerMenu';
import { MobileFooter } from '~/widgets/Layout/ui/MobileFooter';

import { AppRoutes } from './AppRoutes';
import { AppLoader } from './providers/appLoader';
function App() {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <>
                        <AppLoader />
                        <Layout>
                            <AppRoutes />
                        </Layout>
                        <SnackbarAlert />
                        <BurgerMenu />
                        <MobileFooter />
                    </>
                }
            />
            <Route path={ROUTES.SIGN_UP} element={<AuthPage />} />
            <Route path={ROUTES.SIGN_IN} element={<AuthPage />} />
        </Routes>
    );
}

export default App;

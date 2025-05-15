import './App.css';

import { Route, Routes } from 'react-router';

import { AuthPage } from '~/pages/AuthPage';
import { VerificationPage } from '~/pages/AuthPage/ui/VerificationPage';
import { ROUTES } from '~/shared/config/routes';
import { SnackbarAlert } from '~/shared/ui/SnackbarAlert';
import { Layout } from '~/widgets/Layout';
import { BurgerMenu } from '~/widgets/Layout/ui/BurgerMenu';
import { MobileFooter } from '~/widgets/Layout/ui/MobileFooter';

import { AppRoutes } from './AppRoutes';
import { AppLoader } from './providers/appLoader';
function App() {
    return (
        <>
            <SnackbarAlert />
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            <AppLoader />
                            <Layout>
                                <AppRoutes />
                            </Layout>

                            <BurgerMenu />
                            <MobileFooter />
                        </>
                    }
                />
                <Route path={ROUTES.SIGN_UP} element={<AuthPage />} />
                <Route path={ROUTES.SIGN_IN} element={<AuthPage />} />
                <Route path={ROUTES.VERIFICATION} element={<VerificationPage />} />
            </Routes>
        </>
    );
}

export default App;

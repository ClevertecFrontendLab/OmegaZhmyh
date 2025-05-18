import './App.css';

import { Route, Routes } from 'react-router';

import { AuthPage } from '~/pages/AuthPage';
import { VerificationPage } from '~/pages/AuthPage/ui/VerificationPage';
import { ROUTES } from '~/shared/config/routes';
import { SnackbarAlert } from '~/shared/ui/SnackbarAlert';
import { FullscreenSpinner } from '~/widgets/fullScreenSpiner';
import { Layout } from '~/widgets/Layout';

import { AppRoutes } from './AppRoutes';
import { ProtectedRoute } from './ProtectedRoute';
import { AppLoader } from './providers/appLoader';

function App() {
    return (
        <>
            <FullscreenSpinner />
            <SnackbarAlert />
            <Routes>
                <Route
                    path='*'
                    element={
                        <ProtectedRoute>
                            <AppLoader />
                            <Layout>
                                <AppRoutes />
                            </Layout>
                        </ProtectedRoute>
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

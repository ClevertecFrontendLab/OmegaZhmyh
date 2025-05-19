import { Navigate, Route, Routes } from 'react-router';

import { AuthPage } from '~/pages/AuthPage';
import { VerificationPage } from '~/pages/AuthPage/ui/VerificationPage';
import { CuisinePage } from '~/pages/CuisinePage';
import { ErrorPage } from '~/pages/ErrorPage';
import { JuiciestPage } from '~/pages/JuiciestPage';
import { MainPage } from '~/pages/MainPage';
import { RecipePage } from '~/pages/RecipePage';
import { ROUTES } from '~/shared/config/routes';
import { CategoryRedirect } from '~/shared/ui/CategoryRedirect';
import { CategoryValidator } from '~/shared/ui/CategoryValidator';
import { Layout } from '~/widgets/Layout';

import { ProtectedRoute } from './ProtectedRoute';
import { AppLoader } from './providers/appLoader';

export const AppRoutes = () => (
    <Routes>
        <Route
            path={ROUTES.HOME}
            element={
                <ProtectedRoute>
                    <AppLoader />
                    <Layout>
                        <MainPage />
                    </Layout>
                </ProtectedRoute>
            }
        />
        <Route
            path={ROUTES.CATEGORY}
            element={
                <CategoryValidator>
                    <CategoryRedirect />
                </CategoryValidator>
            }
        />
        <Route
            path={ROUTES.SUBCATEGORY}
            element={
                <ProtectedRoute>
                    <AppLoader />
                    <Layout>
                        <CategoryValidator>
                            <CuisinePage />
                        </CategoryValidator>
                    </Layout>
                </ProtectedRoute>
            }
        />
        <Route
            path={ROUTES.RECIPE}
            element={
                <ProtectedRoute>
                    <AppLoader />
                    <Layout>
                        <CategoryValidator>
                            <RecipePage />
                        </CategoryValidator>
                    </Layout>
                </ProtectedRoute>
            }
        />
        <Route
            path={ROUTES.THE_JUICIEST}
            element={
                <ProtectedRoute>
                    <AppLoader />
                    <Layout>
                        <JuiciestPage />
                    </Layout>
                </ProtectedRoute>
            }
        />
        <Route
            path={ROUTES.NOT_FOUND}
            element={
                <Layout>
                    <ErrorPage />
                </Layout>
            }
        />
        <Route path={ROUTES.SIGN_UP} element={<AuthPage />} />
        <Route path={ROUTES.SIGN_IN} element={<AuthPage />} />
        <Route path={ROUTES.VERIFICATION} element={<VerificationPage />} />
        <Route path='*' element={<Navigate to={ROUTES.NOT_FOUND} />} />
    </Routes>
);

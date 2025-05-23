import { Navigate, Route, Routes } from 'react-router';

import { AuthPage } from '~/pages/AuthPage';
import { VerificationPage } from '~/pages/AuthPage/ui/VerificationPage';
import { CuisinePage } from '~/pages/CuisinePage';
import { ErrorPage } from '~/pages/ErrorPage';
import { JuiciestPage } from '~/pages/JuiciestPage';
import { MainPage } from '~/pages/MainPage';
import { RecipePage } from '~/pages/RecipePage';
import { ROUTES } from '~/shared/config/routes.constants';
import { Layout } from '~/widgets/Layout';

import { CategoryRedirect } from './CategoryRedirect';
import { CategoryValidator } from './CategoryValidator';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes = () => (
    <Routes>
        <Route path={ROUTES.CATEGORY} element={<CategoryRedirect />} />
        <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.HOME} element={<MainPage />} />
            <Route
                path={ROUTES.SUBCATEGORY}
                element={
                    <CategoryValidator>
                        <CuisinePage />
                    </CategoryValidator>
                }
            />
            <Route
                path={ROUTES.RECIPE}
                element={
                    <CategoryValidator>
                        <RecipePage />
                    </CategoryValidator>
                }
            />
            <Route path={ROUTES.THE_JUICIEST} element={<JuiciestPage />} />
        </Route>
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

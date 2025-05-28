import { createBrowserRouter } from 'react-router';

import { AuthPage } from '~/pages/AuthPage';
import { VerificationPage } from '~/pages/AuthPage/ui/VerificationPage';
import { CuisinePage } from '~/pages/CuisinePage';
import { ErrorPage } from '~/pages/ErrorPage';
import { JuiciestPage } from '~/pages/JuiciestPage';
import { MainPage } from '~/pages/MainPage';
import { RecipeFormPage } from '~/pages/NewRecipePage';
import { RecipePage } from '~/pages/RecipePage';
import { ROUTES } from '~/shared/config/routes.constants';
import { Layout } from '~/widgets/Layout';

import App from './App';
import { CategoryRedirect } from './CategoryRedirect';
import { CategoryValidator } from './CategoryValidator';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: ROUTES.CATEGORY, element: <CategoryRedirect /> },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: ROUTES.HOME, element: <MainPage /> },
                    {
                        path: ROUTES.SUBCATEGORY,
                        element: (
                            <CategoryValidator>
                                <CuisinePage />
                            </CategoryValidator>
                        ),
                    },
                    {
                        path: ROUTES.RECIPE,
                        element: (
                            <CategoryValidator>
                                <RecipePage />
                            </CategoryValidator>
                        ),
                    },
                    { path: ROUTES.NEW_RECIPE, element: <RecipeFormPage /> },
                    { path: ROUTES.EDIT_RECIPE, element: <RecipeFormPage /> },
                    { path: ROUTES.THE_JUICIEST, element: <JuiciestPage /> },
                ],
            },
            {
                path: ROUTES.NOT_FOUND,
                element: (
                    <Layout>
                        <ErrorPage />
                    </Layout>
                ),
            },
            { path: ROUTES.SIGN_UP, element: <AuthPage /> },
            { path: ROUTES.SIGN_IN, element: <AuthPage /> },
            { path: ROUTES.VERIFICATION, element: <VerificationPage /> },
            { path: '*', element: <ErrorPage /> },
        ],
    },
]);

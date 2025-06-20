import { createBrowserRouter } from 'react-router';

import { AuthPage, VerificationPage } from '~/pages/auth';
import { BloggerProfilePage } from '~/pages/blogger-profile';
import { BlogsPage } from '~/pages/blogs';
import { CuisinePage } from '~/pages/cuisine';
import { JuiciestPage } from '~/pages/juiciest';
import { MainPage } from '~/pages/main';
import { ErrorPage } from '~/pages/not-found';
import { RecipePage } from '~/pages/recipe';
import { RecipeFormPage } from '~/pages/recipe-form';
import { ROUTES } from '~/shared/config';
import { Layout } from '~/widgets/layout';

import App from './App';
import { CategoryRedirect } from './category-redirect';
import { CategoryValidator } from './category-validator';
import { ProtectedRoute } from './protected-route';

export const router = createBrowserRouter([
    {
        element: <App />,
        handle: { title: 'Главная', path: ROUTES.HOME },
        children: [
            { path: ROUTES.CATEGORY, element: <CategoryRedirect /> },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: ROUTES.HOME,
                        element: <MainPage />,
                    },
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
                    {
                        path: ROUTES.NEW_RECIPE,
                        element: <RecipeFormPage />,
                        handle: { title: 'Новый рецепт', path: ROUTES.NEW_RECIPE },
                    },
                    { path: ROUTES.EDIT_RECIPE, element: <RecipeFormPage isEdit /> },
                    {
                        path: ROUTES.THE_JUICIEST,
                        element: <JuiciestPage />,
                        handle: { title: 'Самое сочное', path: ROUTES.THE_JUICIEST },
                    },
                    {
                        path: ROUTES.BLOGS,
                        element: <BlogsPage />,
                        handle: { title: 'Блоги', path: ROUTES.BLOGS },
                    },
                    {
                        path: ROUTES.BLOGGER_PROFILE,
                        element: <BloggerProfilePage />,
                        handle: {
                            title: 'Блоги',
                            path: ROUTES.BLOGS,
                        },
                    },
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

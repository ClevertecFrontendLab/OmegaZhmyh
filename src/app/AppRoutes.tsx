import { Route, Routes } from 'react-router';

import { CuisinePage } from '~/pages/CuisinePage';
import { ErrorPage } from '~/pages/ErrorPage';
import { JuiciestPage } from '~/pages/JuiciestPage';
import { MainPage } from '~/pages/MainPage';
import { RecipePage } from '~/pages/RecipePage';
import { ROUTES } from '~/shared/config/routes';
import { CategoryRedirect } from '~/shared/ui/CategoryRedirect';
import { CategoryValidator } from '~/shared/ui/CategoryValidator';

export const AppRoutes = () => (
    <Routes>
        <Route path={ROUTES.HOME} element={<MainPage />} />
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
        <Route path={ROUTES.NOT_FOUND} element={<ErrorPage />} />
        <Route path='*' element={<ErrorPage />} />
    </Routes>
);

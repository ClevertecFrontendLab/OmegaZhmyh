import { Navigate, Outlet } from 'react-router';

import { useGetCategoriesQuery } from '~/shared/api/yeedaaApi';
import { ROUTES } from '~/shared/config/routes.constants';
import { Layout } from '~/widgets/Layout';

export const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    useGetCategoriesQuery();

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.SIGN_IN} replace />;
    }

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

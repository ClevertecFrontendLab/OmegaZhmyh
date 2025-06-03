import { Navigate, Outlet } from 'react-router';

import { ROUTES } from '~/shared/config/routes.constants';
import { Layout } from '~/widgets/Layout';

export const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('token') !== null;

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.SIGN_IN} replace />;
    }

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

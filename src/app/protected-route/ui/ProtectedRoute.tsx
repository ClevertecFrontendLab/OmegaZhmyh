import { Navigate, Outlet } from 'react-router';

import { ROUTES } from '~/shared/config';
import { Layout } from '~/widgets/layout';

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

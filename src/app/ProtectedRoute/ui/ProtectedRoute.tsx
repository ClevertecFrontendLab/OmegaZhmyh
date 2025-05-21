import { Navigate } from 'react-router';

import { ROUTES } from '~/shared/config/routes';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = localStorage.getItem('token') !== null;

    if (!isAuthenticated) {
        return <Navigate to={`/${ROUTES.SIGN_IN}`} replace />;
    }

    return <>{children}</>;
};

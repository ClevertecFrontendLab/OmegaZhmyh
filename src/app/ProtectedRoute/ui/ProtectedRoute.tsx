import { Navigate } from 'react-router';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = localStorage.getItem('access_token'); // Проверяем наличие токена

    if (!isAuthenticated) {
        return <Navigate to='/auth/login' replace />;
    }

    return <>{children}</>;
};

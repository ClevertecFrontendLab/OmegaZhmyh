import { Navigate, Route, Routes } from 'react-router';

import { ForgotPasswordPage } from '~/pages/AuthPage/ui/ForgotPasswordPage';
import { LoginPage } from '~/pages/AuthPage/ui/LoginPage';
import { SignupPage } from '~/pages/AuthPage/ui/SignupPage';
import { VerificationPage } from '~/pages/AuthPage/ui/VerificationPage';

export const AuthRoutes = () => (
    <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/verification' element={<VerificationPage />} />
        <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
);

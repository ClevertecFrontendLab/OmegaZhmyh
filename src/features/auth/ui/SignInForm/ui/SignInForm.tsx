import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { isErrorResponse } from '~/features/auth/types/auth.types';
import { ROUTES } from '~/shared/config/routes';
import { setAuthLoading } from '~/shared/store/app-slice';
import { useAppDispatch } from '~/shared/store/hooks';
import { useErrorAlert } from '~/shared/ui/SnackbarAlert';

import { useLoginMutation } from '../../../api/authApi';
import { loginSchema } from '../../../validation/auth.validation';
import { AccountRecoveryForm } from '../../ForgotPassword';
import { ForgotPasswordForm } from '../../ForgotPassword/ui/ForgotPasswordForm';
import { VerifyOtpForm } from '../../ForgotPassword/ui/VerifyOtpForm';
import { SignInFormValues } from '../types';
import { ServerErrorModal } from './ServerErrorModal';
import { SignInFormContent } from './SignInFormContent';

export const SignInForm = () => {
    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isRetryModalOpen, setIsRetryModalOpen] = useState(false);
    const [formValues, setFormValues] = useState<SignInFormValues | null>(null);
    const { handleError } = useErrorAlert();

    useEffect(() => {
        dispatch(setAuthLoading(isLoading));
    }, [isLoading, dispatch]);

    const handleSubmit = async (values: SignInFormValues) => {
        try {
            await login(values).unwrap();
            navigate(ROUTES.HOME);
        } catch (error: unknown) {
            if (error && isErrorResponse(error)) {
                if (error.status === 400) {
                    handleError({
                        errorTitle: error.data?.message || 'Пользователь не найден',
                        errorMessage: 'Попробуйте снова.',
                    });
                } else if (error.status === 401) {
                    handleError({
                        errorTitle: 'Неверный логин или пароль',
                        errorMessage: 'Попробуйте снова.',
                    });
                } else if (error.status === 403) {
                    handleError({
                        errorTitle: 'E-mail не верифицирован',
                        errorMessage: 'Проверьте почту и перейдите по ссылке.',
                    });
                } else {
                    setFormValues(values);
                    setIsRetryModalOpen(true);
                }
            }
        }
    };

    const handleRetry = async () => {
        setIsRetryModalOpen(false);
        if (formValues) {
            await handleSubmit(formValues);
        }
    };

    return (
        <>
            <Formik
                initialValues={{ login: '', password: '' }}
                validationSchema={loginSchema}
                validateOnChange={false}
                onSubmit={handleSubmit}
            >
                <SignInFormContent />
            </Formik>
            <ServerErrorModal
                isOpen={isRetryModalOpen}
                onClose={() => setIsRetryModalOpen(false)}
                onRetry={handleRetry}
            />
            <ForgotPasswordForm />
            <VerifyOtpForm />
            <AccountRecoveryForm />
        </>
    );
};

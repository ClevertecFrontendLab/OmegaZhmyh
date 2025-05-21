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

const SIGNIN_FORM_ERROR_MESSAGES = {
    USER_NOT_FOUND: 'Пользователь не найден',
    TRY_AGAIN: 'Попробуйте снова.',
    INVALID_CREDENTIALS: 'Неверный логин или пароль',
    EMAIL_NOT_VERIFIED: 'E-mail не верифицирован',
    CHECK_EMAIL: 'Проверьте почту и перейдите по ссылке.',
} as const;

export const SignInForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const [isRetryModalOpen, setIsRetryModalOpen] = useState(false);
    const [formValues, setFormValues] = useState<SignInFormValues | null>(null);

    const { handleError } = useErrorAlert(
        { base: '50%', lg: '25%' },
        { base: '100px', lg: '80px' },
    );

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
                        errorTitle:
                            error.data?.message || SIGNIN_FORM_ERROR_MESSAGES.USER_NOT_FOUND,
                        errorMessage: SIGNIN_FORM_ERROR_MESSAGES.TRY_AGAIN,
                    });
                } else if (error.status === 401) {
                    handleError({
                        errorTitle: SIGNIN_FORM_ERROR_MESSAGES.INVALID_CREDENTIALS,
                        errorMessage: SIGNIN_FORM_ERROR_MESSAGES.TRY_AGAIN,
                    });
                } else if (error.status === 403) {
                    handleError({
                        errorTitle: SIGNIN_FORM_ERROR_MESSAGES.EMAIL_NOT_VERIFIED,
                        errorMessage: SIGNIN_FORM_ERROR_MESSAGES.CHECK_EMAIL,
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

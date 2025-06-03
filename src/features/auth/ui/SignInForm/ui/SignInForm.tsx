import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { isErrorResponse, LoginRequest } from '~/features/auth/types/auth.types';
import { HTTP_STATUS } from '~/shared/config/http-status-codes.constants';
import { ROUTES } from '~/shared/config/routes.constants';
import { setAuthLoading } from '~/shared/store/app-slice';
import { useAppDispatch } from '~/shared/store/hooks';
import { useErrorAlert } from '~/shared/ui/alert';

import { useLoginMutation } from '../../../api/authApi';
import { SIGNIN_FORM_ERROR_MESSAGES } from '../../../constants/form-messages.constants.ts';
import { loginSchema } from '../../../validation/auth.validation';
import { AccountRecoveryForm } from '../../ForgotPassword';
import { ForgotPasswordForm } from '../../ForgotPassword/ui/ForgotPasswordForm';
import { VerifyOtpForm } from '../../ForgotPassword/ui/VerifyOtpForm';
import { ServerErrorModal } from './ServerErrorModal';
import { SignInFormContent } from './SignInFormContent';

export const SignInForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [login] = useLoginMutation();

    const [isRetryModalOpen, setIsRetryModalOpen] = useState(false);
    const [formValues, setFormValues] = useState<LoginRequest | null>(null);
    const [isInvalid, setIsInvalid] = useState(false);

    const { handleError } = useErrorAlert({ base: '50%', lg: '25%' }, { base: '95px', lg: '80px' });

    const handleSubmit = async (values: LoginRequest) => {
        try {
            dispatch(setAuthLoading(true));
            await login(values).unwrap();
            navigate(ROUTES.HOME);
        } catch (error: unknown) {
            if (error && isErrorResponse(error)) {
                if (error.status === HTTP_STATUS.BAD_REQUEST) {
                    handleError({
                        errorTitle: SIGNIN_FORM_ERROR_MESSAGES.USER_NOT_FOUND,
                        errorMessage: SIGNIN_FORM_ERROR_MESSAGES.TRY_AGAIN,
                    });
                } else if (error.status === HTTP_STATUS.UNAUTHORIZED) {
                    setIsInvalid(true);
                    handleError({
                        errorTitle: SIGNIN_FORM_ERROR_MESSAGES.INVALID_CREDENTIALS,
                        errorMessage: SIGNIN_FORM_ERROR_MESSAGES.TRY_AGAIN,
                    });
                } else if (error.status === HTTP_STATUS.FORBIDDEN) {
                    handleError({
                        errorTitle: SIGNIN_FORM_ERROR_MESSAGES.EMAIL_NOT_VERIFIED,
                        errorMessage: SIGNIN_FORM_ERROR_MESSAGES.CHECK_EMAIL,
                    });
                } else {
                    setFormValues(values);
                    setIsRetryModalOpen(true);
                }
            }
        } finally {
            dispatch(setAuthLoading(false));
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
                {({ handleChange }) => (
                    <SignInFormContent
                        isInvalid={isInvalid}
                        onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setIsInvalid(false);
                            handleChange(e);
                        }}
                    />
                )}
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

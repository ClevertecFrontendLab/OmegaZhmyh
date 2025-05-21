import { Box, Progress, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';

import { isErrorResponse } from '~/features/auth/types/auth.types';
import { useAppDispatch } from '~/shared/store/hooks';
import { setEmailVerificationModal } from '~/shared/store/notificationSlice';
import { useErrorAlert } from '~/shared/ui/SnackbarAlert';

import { useSignupMutation } from '../../../api/authApi';
import { signupStep1Schema } from '../../../validation/auth.validation';
import { EmailVerificationModal } from './EmailVerificationModal';
import { FirstStep } from './FirstStep';
import { SecondStep } from './SecondStep';
import { VerificationErrorModal } from './VerificationErrorModal';

type SignUpFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    password: string;
    passwordConfirm: string;
};

const initialValues: SignUpFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    login: '',
    password: '',
    passwordConfirm: '',
};

const SIGNUP_FORM_ERROR_MESSAGES = {
    TRY_AGAIN: 'Попробуйте немного позже',
    SERVER_ERROR: 'Ошибка сервера',
    UNKNOWN_ERROR: 'Неизвестная ошибка',
    LOGIN_CONFLICT: 'Пользователь с таким login уже существует.',
    EMAIL_CONFLICT: 'Пользователь с таким email уже существует.',
} as const;

const SIGNUP_STEP_TITLES = ['Шаг 1. Личная информация', 'Шаг 2. Логин и пароль'];

export const SignUpForm = () => {
    const dispatch = useAppDispatch();

    const [signup] = useSignupMutation();

    const [currentStep, setCurrentStep] = useState(1);

    const { handleError } = useErrorAlert(
        { base: '50%', lg: '25%' },
        { base: '100px', lg: '80px' },
    );

    const getProgressValue = (
        values: { [key: string]: string },
        errors: { [key: string]: string },
    ) => {
        const totalFields = Object.keys(values);
        const errorFields = Object.values(errors).filter(Boolean);
        const filledFields = Object.values(values).filter(Boolean);
        return filledFields.length > 0
            ? ((totalFields.length - errorFields.length) / totalFields.length) * 100
            : 0;
    };

    const validationSchema = signupStep1Schema;

    const handleSubmit = async (values: SignUpFormValues) => {
        try {
            await signup(values).unwrap();
            dispatch(setEmailVerificationModal({ email: values.email }));
        } catch (error) {
            if (error && isErrorResponse(error)) {
                if (
                    error.status === 400 &&
                    error.data?.message == SIGNUP_FORM_ERROR_MESSAGES.LOGIN_CONFLICT
                ) {
                    handleError({
                        errorTitle: SIGNUP_FORM_ERROR_MESSAGES.LOGIN_CONFLICT,
                        errorMessage: SIGNUP_FORM_ERROR_MESSAGES.TRY_AGAIN,
                    });
                } else if (
                    error.status === 400 &&
                    error.data?.message == SIGNUP_FORM_ERROR_MESSAGES.EMAIL_CONFLICT
                ) {
                    handleError({
                        errorTitle: SIGNUP_FORM_ERROR_MESSAGES.EMAIL_CONFLICT,
                        errorMessage: SIGNUP_FORM_ERROR_MESSAGES.TRY_AGAIN,
                    });
                } else if (error.status === 500) {
                    handleError({
                        errorTitle: SIGNUP_FORM_ERROR_MESSAGES.SERVER_ERROR,
                        errorMessage: SIGNUP_FORM_ERROR_MESSAGES.TRY_AGAIN,
                    });
                } else {
                    handleError({
                        errorTitle: SIGNUP_FORM_ERROR_MESSAGES.UNKNOWN_ERROR,
                        errorMessage: SIGNUP_FORM_ERROR_MESSAGES.TRY_AGAIN,
                    });
                }
            }
        }
    };

    return (
        <Box>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors }) => (
                    <Form data-test-id='sign-up-form'>
                        <Text>{SIGNUP_STEP_TITLES[currentStep - 1]}</Text>
                        <Progress
                            height='8px'
                            isAnimated
                            hasStripe
                            bgColor='blackAlpha.100'
                            sx={{
                                '& > div': {
                                    backgroundColor: 'lime.300',
                                },
                            }}
                            value={getProgressValue(values, errors)}
                            mb={4}
                            data-test-id='sign-up-progress'
                        />
                        {currentStep === 1 ? (
                            <FirstStep setCurrentStep={setCurrentStep} />
                        ) : (
                            <SecondStep />
                        )}
                    </Form>
                )}
            </Formik>
            <EmailVerificationModal />
            <VerificationErrorModal />
        </Box>
    );
};

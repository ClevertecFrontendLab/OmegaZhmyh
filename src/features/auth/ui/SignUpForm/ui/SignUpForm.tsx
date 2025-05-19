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
    confirmPassword: string;
};

const initialValues: SignUpFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    login: '',
    password: '',
    confirmPassword: '',
};

export const SignUpForm = () => {
    const [signup] = useSignupMutation();
    const [currentStep, setCurrentStep] = useState(1);
    const { handleError } = useErrorAlert();
    const dispatch = useAppDispatch();

    const stepTitles = ['Шаг 1. Личная информация', 'Шаг 2. Логин и пароль'];

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
            const SIGN_UP_LOGIN_CONFLICT_MESSAGE = 'Пользователь с таким login уже существует.';
            const SIGN_UP_EMAIL_CONFLICT_MESSAGE = 'Пользователь с таким email уже существует.';

            if (error && isErrorResponse(error)) {
                if (error.status === 400 && error.data?.message == SIGN_UP_LOGIN_CONFLICT_MESSAGE) {
                    handleError({
                        errorTitle: SIGN_UP_LOGIN_CONFLICT_MESSAGE,
                        errorMessage: 'Попробуйте снова.',
                    });
                } else if (
                    error.status === 400 &&
                    error.data?.message == SIGN_UP_EMAIL_CONFLICT_MESSAGE
                ) {
                    handleError({
                        errorTitle: SIGN_UP_EMAIL_CONFLICT_MESSAGE,
                        errorMessage: 'Попробуйте снова.',
                    });
                } else if (error.status === 500) {
                    handleError({
                        errorTitle: 'Ошибка сервера',
                        errorMessage: 'Попробуйте немного позже.',
                    });
                } else {
                    handleError({
                        errorTitle: 'Неизвестная ошибка',
                        errorMessage: 'Попробуйте немного позже.',
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
                        <Text>{stepTitles[currentStep - 1]}</Text>
                        <Progress
                            colorScheme='lime'
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

import { Box, Link, Progress, Text, useDisclosure } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';

import verificationImage from '~/shared/assets/email-code-verification2.png';
import verificationFailed from '~/shared/assets/verification-failed.png';
import { useAppDispatch, useAppSelector } from '~/shared/store/hooks';
import {
    clearVerificationFailedModal,
    selectVerificationFailedModal,
} from '~/shared/store/notificationSlice';
import { ModalNotification } from '~/shared/ui/ModalNotification';
import { useErrorAlert } from '~/shared/ui/SnackbarAlert';

import { useSignupMutation } from '../../../api/authApi';
import { signupStep1Schema } from '../../../validation/auth.validation';
import { FirstStep } from './FirstStep';
import { SecondStep } from './SecondStep';

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
    const isVerificationFailed = useAppSelector(selectVerificationFailedModal);
    const onVerificationFailedClose = () => dispatch(clearVerificationFailedModal());

    const {
        isOpen: isVerificationSuccess,
        onClose: onVerificationSuccessClose,
        onOpen: onVerificationSuccessOpen,
    } = useDisclosure();

    const stepTitles = ['Шаг 1. Личная информация', 'Шаг 2. Логин и пароль'];

    const getProgressValue = (
        values: { [key: string]: string },
        errors: { [key: string]: string },
        touched: { [key: string]: boolean },
    ) => {
        const totalFields = Object.values(values);
        const errorFields = Object.values(errors).filter(Boolean);
        const touchedFields = Object.keys(touched);
        return touchedFields.length > 0
            ? ((totalFields.length - errorFields.length) / totalFields.length) * 100
            : 0;
    };

    const validationSchema = signupStep1Schema;

    const handleSubmit = async (values: SignUpFormValues) => {
        try {
            await signup(values).unwrap();
            onVerificationSuccessOpen();
        } catch (error) {
            if (error && typeof error === 'object' && 'status' in error && error.status === 400) {
                handleError({
                    errorTitle: 'Неверный логин или пароль',
                    errorMessage: 'Попробуйте снова.',
                });
            }
            if (error && typeof error === 'object' && 'status' in error && error.status === 500) {
                handleError({
                    errorTitle: 'Ошибка сервера',
                    errorMessage: 'Попробуйте немного позже.',
                });
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
                {({ values, errors, touched }) => (
                    <Form>
                        <Text>{stepTitles[currentStep - 1]}</Text>
                        <Progress
                            colorScheme='lime'
                            value={getProgressValue(values, errors, touched)}
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
            <ModalNotification
                isOpen={isVerificationSuccess}
                onClose={onVerificationSuccessClose}
                img={verificationImage}
                title='Остался последний шаг. Нужно верифицировать ваш e-mail '
                body={
                    <Text>
                        Мы отправили вам на почту{' '}
                        <Text fontWeight='semibold'>ekaterinabaker@gmail.ru</Text> ссылку для
                        верификации.
                    </Text>
                }
                footer='Не пришло письмо? Проверьте папку Спам. По другим вопросам свяжитесь с поддержкой'
            />
            <ModalNotification
                isOpen={isVerificationFailed}
                onClose={onVerificationFailedClose}
                img={verificationFailed}
                title='Упс! Что-то пошло не так'
                body='Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться снова.'
                footer={
                    <Text>
                        Остались вопросы? Свяжитесь{' '}
                        <Link textDecor='underline' href='mailto:support@example.com'>
                            с поддержкой
                        </Link>
                    </Text>
                }
            />
        </Box>
    );
};

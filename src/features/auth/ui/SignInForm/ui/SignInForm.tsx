import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { ROUTES } from '~/shared/config/routes';
import { setAuthLoading } from '~/shared/store/app-slice';
import { useAppDispatch } from '~/shared/store/hooks';
import { setForgotPasswordModal } from '~/shared/store/notificationSlice';
import { BsEyeFill } from '~/shared/ui/Icons/ui/BsEyeFill';
import { BsEyeSlashFill } from '~/shared/ui/Icons/ui/BsEyeSlashFill';
import { useErrorAlert } from '~/shared/ui/SnackbarAlert';

import { useLoginMutation } from '../../../api/authApi';
import { loginSchema } from '../../../validation/auth.validation';
import { ForgotPasswordForm } from '../../ForgotPassword/ui/ForgotPasswordForm';
import { VerifyOtpForm } from '../../ForgotPassword/ui/VerifyOtpForm';
import { ServerErrorModal } from './ServerErrorModal';

type SignInFormValues = {
    login: string;
    password: string;
};

export const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
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
            console.log(error);
            if (
                error &&
                typeof error === 'object' &&
                'statusCode' in error &&
                error.statusCode === 400 &&
                'message' in error &&
                typeof error.message === 'string'
            ) {
                handleError({
                    errorTitle: error.message,
                    errorMessage: 'Попробуйте снова.',
                });
            } else if (
                error &&
                typeof error === 'object' &&
                'status' in error &&
                error.status === 401
            ) {
                handleError({
                    errorTitle: 'Неверный логин или пароль',
                    errorMessage: 'Попробуйте снова.',
                });
            } else if (
                error &&
                typeof error === 'object' &&
                'status' in error &&
                error.status === 403
            ) {
                handleError({
                    errorTitle: 'E-mail не верифицирован',
                    errorMessage: 'Проверьте почту и перейдите по ссылке.',
                });
            } else if (
                error &&
                typeof error === 'object' &&
                'status' in error &&
                typeof error.status === 'number' &&
                error.status >= 500
            ) {
                setFormValues(values);
                setIsRetryModalOpen(true);
            }
        }
    };

    const handleRetry = async () => {
        setIsRetryModalOpen(false);
        if (formValues) {
            await handleSubmit(formValues);
        }
    };

    const onForgotPassword = () => {
        dispatch(setForgotPasswordModal());
    };

    return (
        <>
            <Formik
                initialValues={{ login: '', password: '' }}
                validationSchema={loginSchema}
                validateOnChange={false}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, handleBlur, setFieldValue }) => {
                    const handleTrimBlur = (e: React.FocusEvent<HTMLInputElement>) => {
                        const { name, value } = e.target;
                        setFieldValue(name, value.trim());
                        handleBlur({ target: { name, value: value.trim() } });
                    };

                    return (
                        <Form data-test-id='sign-in-form'>
                            <VStack
                                justifyContent='space-between'
                                alignItems='stretch'
                                minH='376px'
                            >
                                <VStack spacing='24px'>
                                    <FormControl isInvalid={!!errors.login && touched.login}>
                                        <FormLabel htmlFor='login' fontWeight='normal'>
                                            Логин для входа на сайт
                                        </FormLabel>
                                        <Field
                                            as={Input}
                                            name='login'
                                            size='lg'
                                            bgColor='white'
                                            placeholder='Логин'
                                            data-test-id='login-input'
                                            onBlur={handleTrimBlur}
                                        />
                                        <FormErrorMessage>{errors.login}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={!!errors.password && touched.password}>
                                        <FormLabel htmlFor='password' fontWeight='normal'>
                                            Пароль
                                        </FormLabel>
                                        <InputGroup size='lg'>
                                            <Field
                                                as={Input}
                                                name='password'
                                                type={showPassword ? 'text' : 'password'}
                                                bgColor='white'
                                                placeholder='Пароль'
                                                data-test-id='password-input'
                                            />
                                            <InputRightElement>
                                                <IconButton
                                                    icon={
                                                        showPassword ? (
                                                            <BsEyeFill />
                                                        ) : (
                                                            <BsEyeSlashFill />
                                                        )
                                                    }
                                                    aria-label='Показать пароль'
                                                    variant='unstyled'
                                                    onMouseDown={() => setShowPassword(true)}
                                                    onMouseUp={() => setShowPassword(false)}
                                                    onMouseLeave={() => setShowPassword(false)}
                                                    data-test-id='password-visibility-button'
                                                />
                                            </InputRightElement>
                                        </InputGroup>
                                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                                    </FormControl>
                                </VStack>

                                <VStack spacing='16px' alignItems='stretch'>
                                    <Button
                                        type='submit'
                                        bgColor='black'
                                        color='white'
                                        size='lg'
                                        data-test-id='submit-button'
                                    >
                                        Войти
                                    </Button>
                                    <Button
                                        variant='unstyled'
                                        textAlign='center'
                                        onClick={onForgotPassword}
                                        data-test-id='forgot-password'
                                    >
                                        Забыли логин или пароль?
                                    </Button>
                                </VStack>
                            </VStack>
                        </Form>
                    );
                }}
            </Formik>
            <ServerErrorModal
                isOpen={isRetryModalOpen}
                onClose={() => setIsRetryModalOpen(false)}
                onRetry={handleRetry}
            />
            <ForgotPasswordForm />
            <VerifyOtpForm />
        </>
    );
};

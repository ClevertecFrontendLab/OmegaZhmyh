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
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router';

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

export const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isRetryModalOpen, setIsRetryModalOpen] = useState(false);
    const [formValues, setFormValues] = useState<{ login: string; password: string } | null>(null);

    const { handleError } = useErrorAlert();

    const handleSubmit = async (values: { login: string; password: string }) => {
        try {
            await login(values).unwrap();
            navigate('/recipes');
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'status' in error && error.status === 401) {
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
                    errorMessage: 'Проверьте почту и попробуйте снова.',
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
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        <VStack justifyContent='space-between' alignItems='stretch' minH='376px'>
                            <VStack spacing='24px'>
                                <FormControl isInvalid={!!errors.login && touched.login}>
                                    <FormLabel htmlFor='login' fontWeight='normal'>
                                        Логин для входа на сайт
                                    </FormLabel>
                                    <Input
                                        id='login'
                                        name='login'
                                        value={values.login}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        size='lg'
                                        bgColor='white'
                                        placeholder='Логин'
                                        data-test-id='login-input'
                                    />
                                    <FormErrorMessage>{errors.login}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.password && touched.password}>
                                    <FormLabel htmlFor='password' fontWeight='normal'>
                                        Пароль
                                    </FormLabel>
                                    <InputGroup size='lg'>
                                        <Input
                                            id='password'
                                            name='password'
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
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
                                >
                                    Забыли логин или пароль?
                                </Button>
                            </VStack>
                        </VStack>
                    </Form>
                )}
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

import {
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    PinInput,
    PinInputField,
    VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useVerifyOtpMutation,
} from '../api/authApi';
import { forgotPasswordSchema, resetPasswordSchema } from '../validation/auth.validation';

type Step = 'email' | 'otp' | 'reset';

export const ForgotPasswordForm = () => {
    const [step, setStep] = useState<Step>('email');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [forgotPassword] = useForgotPasswordMutation();
    const [verifyOtp] = useVerifyOtpMutation();
    const [resetPassword] = useResetPasswordMutation();
    const navigate = useNavigate();

    const handleEmailSubmit = async (values: { email: string }) => {
        try {
            await forgotPassword(values).unwrap();
            setEmail(values.email);
            setStep('otp');
        } catch (error) {
            console.log(error);
            // Обработка ошибок будет добавлена позже
        }
    };

    const handleOtpSubmit = async (otp: string) => {
        try {
            await verifyOtp({ email, code: otp }).unwrap();
            setStep('reset');
        } catch (error) {
            console.log(error);
            // Обработка ошибок будет добавлена позже
        }
    };

    const handleResetSubmit = async (values: {
        login: string;
        password: string;
        confirmPassword: string;
    }) => {
        try {
            await resetPassword(values).unwrap();
            navigate('/login');
        } catch (error) {
            console.log(error);
            // Обработка ошибок будет добавлена позже
        }
    };

    return (
        <Modal isOpen onClose={() => navigate('/login')}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {step === 'email'
                        ? 'Восстановление пароля'
                        : step === 'otp'
                          ? 'Введите код'
                          : 'Новый пароль'}
                </ModalHeader>
                <ModalCloseButton data-test-id='close-button' />
                <ModalBody pb={6}>
                    {step === 'email' && (
                        <Formik
                            initialValues={{ email: '' }}
                            validationSchema={forgotPasswordSchema}
                            onSubmit={handleEmailSubmit}
                        >
                            {({ values, errors, touched, handleChange, handleBlur }) => (
                                <Form>
                                    <VStack spacing={4}>
                                        <FormControl isInvalid={!!errors.email && touched.email}>
                                            <Input
                                                id='email'
                                                name='email'
                                                type='email'
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder='Email'
                                                data-test-id='email-input'
                                            />
                                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                                        </FormControl>
                                        <Button
                                            type='submit'
                                            colorScheme='blue'
                                            data-test-id='submit-button'
                                        >
                                            Получить код
                                        </Button>
                                    </VStack>
                                </Form>
                            )}
                        </Formik>
                    )}

                    {step === 'otp' && (
                        <VStack spacing={4}>
                            <PinInput otp size='lg' onComplete={handleOtpSubmit}>
                                {[...Array(6)].map((_, index) => (
                                    <PinInputField
                                        key={index}
                                        data-test-id={`verification-code-input-${index + 1}`}
                                    />
                                ))}
                            </PinInput>
                        </VStack>
                    )}

                    {step === 'reset' && (
                        <Formik
                            initialValues={{ login: '', password: '', confirmPassword: '' }}
                            validationSchema={resetPasswordSchema}
                            onSubmit={handleResetSubmit}
                        >
                            {({ values, errors, touched, handleChange, handleBlur }) => (
                                <Form>
                                    <VStack spacing={4}>
                                        <FormControl isInvalid={!!errors.login && touched.login}>
                                            <Input
                                                id='login'
                                                name='login'
                                                value={values.login}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder='Логин'
                                                data-test-id='login-input'
                                            />
                                            <FormErrorMessage>{errors.login}</FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={!!errors.password && touched.password}
                                        >
                                            <InputGroup>
                                                <Input
                                                    id='password'
                                                    name='password'
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder='Пароль'
                                                    data-test-id='password-input'
                                                />
                                                <InputRightElement width='4.5rem'>
                                                    <Button
                                                        h='1.75rem'
                                                        size='sm'
                                                        onMouseDown={() => setShowPassword(true)}
                                                        onMouseUp={() => setShowPassword(false)}
                                                        onMouseLeave={() => setShowPassword(false)}
                                                    >
                                                        {showPassword ? 'Скрыть' : 'Показать'}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>{errors.password}</FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={
                                                !!errors.confirmPassword && touched.confirmPassword
                                            }
                                        >
                                            <InputGroup>
                                                <Input
                                                    id='confirmPassword'
                                                    name='confirmPassword'
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    value={values.confirmPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder='Повторите пароль'
                                                    data-test-id='confirm-password-input'
                                                />
                                                <InputRightElement width='4.5rem'>
                                                    <Button
                                                        h='1.75rem'
                                                        size='sm'
                                                        onMouseDown={() =>
                                                            setShowConfirmPassword(true)
                                                        }
                                                        onMouseUp={() =>
                                                            setShowConfirmPassword(false)
                                                        }
                                                        onMouseLeave={() =>
                                                            setShowConfirmPassword(false)
                                                        }
                                                    >
                                                        {showConfirmPassword
                                                            ? 'Скрыть'
                                                            : 'Показать'}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>
                                                {errors.confirmPassword}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <Button
                                            type='submit'
                                            colorScheme='blue'
                                            data-test-id='submit-button'
                                        >
                                            Сохранить
                                        </Button>
                                    </VStack>
                                </Form>
                            )}
                        </Formik>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

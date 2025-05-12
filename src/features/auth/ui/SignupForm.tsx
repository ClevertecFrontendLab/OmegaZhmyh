import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    InputGroup,
    InputRightElement,
    Progress,
    VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';

import { useSignupMutation } from '../api/authApi';
import { signupStep1Schema, signupStep2Schema } from '../validation/auth.validation';

type SignupStep1Values = {
    firstName: string;
    lastName: string;
    email: string;
};

type SignupStep2Values = {
    login: string;
    password: string;
    confirmPassword: string;
};

export const SignupForm = () => {
    const [step, setStep] = useState(1);
    const [step1Values, setStep1Values] = useState<SignupStep1Values>({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signup] = useSignupMutation();
    const calculateProgress = (values: SignupStep1Values | SignupStep2Values) => {
        const totalFields = step === 1 ? 3 : 3;
        const validFields = Object.keys(values).filter((key) => key in values).length;
        return ((totalFields - validFields) / totalFields) * 100;
    };

    const handleStep1Submit = (values: SignupStep1Values) => {
        setStep1Values(values);
        setStep(2);
    };

    const handleStep2Submit = async (values: SignupStep2Values) => {
        if (!step1Values) return;

        try {
            await signup({
                ...step1Values,
                ...values,
            }).unwrap();
            // Здесь будет модальное окно успешной регистрации
        } catch (error) {
            console.log(error);
            // Обработка ошибок будет добавлена позже
        }
    };

    return (
        <Box>
            <Progress
                value={step === 1 ? calculateProgress(step1Values) : 100}
                mb={4}
                data-test-id='sign-up-progress'
            />

            {step === 1 ? (
                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '' }}
                    validationSchema={signupStep1Schema}
                    onSubmit={handleStep1Submit}
                >
                    {({ values, errors, touched, handleChange, handleBlur }) => (
                        <Form>
                            <VStack spacing={4} align='stretch'>
                                <FormControl isInvalid={!!errors.firstName && touched.firstName}>
                                    <Input
                                        id='firstName'
                                        name='firstName'
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Ваше имя'
                                        data-test-id='first-name-input'
                                    />
                                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.lastName && touched.lastName}>
                                    <Input
                                        id='lastName'
                                        name='lastName'
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Ваша фамилия'
                                        data-test-id='last-name-input'
                                    />
                                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.email && touched.email}>
                                    <Input
                                        id='email'
                                        name='email'
                                        type='email'
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Ваш email'
                                        data-test-id='email-input'
                                    />
                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                </FormControl>

                                <Button
                                    type='submit'
                                    colorScheme='blue'
                                    data-test-id='submit-button'
                                >
                                    Дальше
                                </Button>
                            </VStack>
                        </Form>
                    )}
                </Formik>
            ) : (
                <Formik
                    initialValues={{ login: '', password: '', confirmPassword: '' }}
                    validationSchema={signupStep2Schema}
                    onSubmit={handleStep2Submit}
                >
                    {({ values, errors, touched, handleChange, handleBlur }) => (
                        <Form>
                            <VStack spacing={4} align='stretch'>
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

                                <FormControl isInvalid={!!errors.password && touched.password}>
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
                                    isInvalid={!!errors.confirmPassword && touched.confirmPassword}
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
                                                onMouseDown={() => setShowConfirmPassword(true)}
                                                onMouseUp={() => setShowConfirmPassword(false)}
                                                onMouseLeave={() => setShowConfirmPassword(false)}
                                            >
                                                {showConfirmPassword ? 'Скрыть' : 'Показать'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                                </FormControl>

                                <Button
                                    type='submit'
                                    colorScheme='blue'
                                    data-test-id='submit-button'
                                >
                                    Зарегистрироваться
                                </Button>
                            </VStack>
                        </Form>
                    )}
                </Formik>
            )}
        </Box>
    );
};

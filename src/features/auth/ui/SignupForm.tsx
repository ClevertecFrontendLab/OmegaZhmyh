import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Progress,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { useState } from 'react';

import { BsEyeFill } from '~/shared/ui/Icons/ui/BsEyeFill';
import { BsEyeSlashFill } from '~/shared/ui/Icons/ui/BsEyeSlashFill';

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

const FirstStep = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { errors, touched, validateForm, setTouched } = useFormikContext<SignupStep1Values>();
    const setSecondStep = () => {
        setTouched({
            firstName: true,
            lastName: true,
            email: true,
        });
        validateForm().then((errors) => {
            if (Object.keys(errors).length === 0) {
                setCurrentStep(2);
            }
        });
    };

    return (
        <VStack justifyContent='space-between' alignItems='stretch' minH='376px'>
            <VStack spacing='24px'>
                <FormControl isInvalid={!!errors.firstName && touched.firstName}>
                    <FormLabel htmlFor='firstName' fontWeight='normal'>
                        Имя
                    </FormLabel>
                    <Input
                        as={Field}
                        name='firstName'
                        size='lg'
                        bgColor='white'
                        placeholder='Имя'
                    />
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.lastName && touched.lastName}>
                    <FormLabel htmlFor='lastName' fontWeight='normal'>
                        Фамилия
                    </FormLabel>
                    <Input
                        as={Field}
                        name='lastName'
                        size='lg'
                        bgColor='white'
                        placeholder='Фамилия'
                    />
                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel htmlFor='email' fontWeight='normal'>
                        Email
                    </FormLabel>
                    <Input as={Field} name='email' size='lg' bgColor='white' placeholder='Email' />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
            </VStack>

            <VStack spacing='16px' alignItems='stretch'>
                <Button onClick={setSecondStep} bgColor='black' color='white' size='lg'>
                    Далее
                </Button>
            </VStack>
        </VStack>
    );
};

const SecondStep = () => {
    const { errors, touched } = useFormikContext<SignupStep2Values>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <VStack justifyContent='space-between' alignItems='stretch' minH='376px'>
            <VStack spacing='24px'>
                <FormControl isInvalid={!!errors.login && touched.login}>
                    <FormLabel htmlFor='login' fontWeight='normal'>
                        Логин для входа на сайт
                    </FormLabel>
                    <Input
                        as={Field}
                        name='login'
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
                            as={Field}
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            bgColor='white'
                            placeholder='Пароль'
                        />
                        <InputRightElement>
                            <IconButton
                                icon={showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                                aria-label='Показать пароль'
                                variant='unstyled'
                                onMouseDown={() => setShowPassword(true)}
                                onMouseUp={() => setShowPassword(false)}
                                onMouseLeave={() => setShowPassword(false)}
                            />
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.confirmPassword && touched.confirmPassword}>
                    <FormLabel htmlFor='password' fontWeight='normal'>
                        Повторите пароль
                    </FormLabel>
                    <InputGroup size='lg'>
                        <Input
                            as={Field}
                            name='confirmPassword'
                            type={showConfirmPassword ? 'text' : 'password'}
                            bgColor='white'
                            placeholder='Повторите пароль'
                        />
                        <InputRightElement>
                            <IconButton
                                icon={showConfirmPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                                aria-label='Показать пароль'
                                variant='unstyled'
                                onMouseDown={() => setShowConfirmPassword(true)}
                                onMouseUp={() => setShowConfirmPassword(false)}
                                onMouseLeave={() => setShowConfirmPassword(false)}
                            />
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                </FormControl>
            </VStack>

            <VStack spacing='16px' alignItems='stretch'>
                <Button type='submit' bgColor='black' color='white' size='lg'>
                    Зарегистрироваться
                </Button>
            </VStack>
        </VStack>
    );
};

export const SignUpForm = () => {
    const [_signup] = useSignupMutation();
    const [currentStep, setCurrentStep] = useState(1);

    const stepTitles = ['Шаг 1. Личная информация', 'Шаг 2. Логин и пароль'];
    const getProgressValue = (values: { [key: string]: string }) =>
        (Object.values(values).filter((value) => value).length / Object.values(values).length) *
        100;

    const validationSchema = currentStep === 1 ? signupStep1Schema : signupStep2Schema;

    const handleSubmit = async (values: { login: string; password: string }) => {
        console.log(values);
    };

    return (
        <Box>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    login: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <Form>
                        <Text>{stepTitles[currentStep - 1]}</Text>
                        <Progress
                            colorScheme='lime'
                            value={getProgressValue(values)}
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
        </Box>
    );
};

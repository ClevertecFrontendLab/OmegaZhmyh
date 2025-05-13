import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { BsEyeFill } from '~/shared/ui/Icons/ui/BsEyeFill';
import { BsEyeSlashFill } from '~/shared/ui/Icons/ui/BsEyeSlashFill';

import { useLoginMutation } from '../api/authApi';
import { loginSchema } from '../validation/auth.validation';

export const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [_login] = useLoginMutation();
    const _navigate = useNavigate();

    const handleSubmit = async (values: { login: string; password: string }) => {
        /* try {
            await login(values).unwrap();
            navigate('/recipes');
        } catch (error) {
            console.log(error);
            // Обработка ошибок будет добавлена позже
        } */
        console.log(values);
    };

    return (
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
                                            icon={showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
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
                            <Link textAlign='center'>Забыли логин или пароль?</Link>
                        </VStack>
                    </VStack>
                </Form>
            )}
        </Formik>
    );
};

import {
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useLoginMutation } from '../api/authApi';
import { loginSchema } from '../validation/auth.validation';

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const handleSubmit = async (values: { login: string; password: string }) => {
        try {
            await login(values).unwrap();
            navigate('/recipes');
        } catch (error) {
            console.log(error);
            // Обработка ошибок будет добавлена позже
        }
    };

    return (
        <Formik
            initialValues={{ login: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
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
                                        data-test-id='password-visibility-button'
                                    >
                                        {showPassword ? 'Скрыть' : 'Показать'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{errors.password}</FormErrorMessage>
                        </FormControl>

                        <Button type='submit' colorScheme='blue' data-test-id='submit-button'>
                            Войти
                        </Button>
                    </VStack>
                </Form>
            )}
        </Formik>
    );
};

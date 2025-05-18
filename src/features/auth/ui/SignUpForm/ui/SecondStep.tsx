import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
} from '@chakra-ui/react';
import { Field, useFormikContext } from 'formik';
import { useState } from 'react';

import { BsEyeFill } from '~/shared/ui/Icons/ui/BsEyeFill';
import { BsEyeSlashFill } from '~/shared/ui/Icons/ui/BsEyeSlashFill';

type SignupStep2Values = {
    login: string;
    password: string;
    confirmPassword: string;
};

export const SecondStep = () => {
    const { errors, touched, handleBlur, setFieldValue } = useFormikContext<SignupStep2Values>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleTrimBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFieldValue(name, value.trim());
        handleBlur({ target: { name, value: value.trim() } });
    };

    return (
        <VStack justifyContent='space-between' alignItems='stretch' minH='376px'>
            <VStack spacing='24px'>
                <FormControl isInvalid={!!errors.login && touched.login}>
                    <FormLabel htmlFor='login' fontWeight='normal'>
                        Логин для входа на сайт
                    </FormLabel>
                    <Field
                        as={Input}
                        id='login'
                        name='login'
                        size='lg'
                        bgColor='white'
                        placeholder='Логин'
                        data-test-id='login-input'
                        onBlur={handleTrimBlur}
                    />
                    <FormHelperText>Логин не менее 5 символов, только латиница</FormHelperText>
                    <FormErrorMessage>{errors.login}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password && touched.password}>
                    <FormLabel htmlFor='password' fontWeight='normal'>
                        Пароль
                    </FormLabel>
                    <InputGroup size='lg'>
                        <Field
                            as={Input}
                            id='password'
                            name='password'
                            type={showPassword ? 'text' : 'password'}
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
                            />
                        </InputRightElement>
                    </InputGroup>
                    <FormHelperText>
                        Пароль не менее 8 символов, с заглавной буквой и цифрой
                    </FormHelperText>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.confirmPassword && touched.confirmPassword}>
                    <FormLabel htmlFor='password' fontWeight='normal'>
                        Повторите пароль
                    </FormLabel>
                    <InputGroup size='lg'>
                        <Field
                            as={Input}
                            id='confirmPassword'
                            name='confirmPassword'
                            type={showConfirmPassword ? 'text' : 'password'}
                            bgColor='white'
                            placeholder='Повторите пароль'
                            data-test-id='confirm-password-input'
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
                <Button
                    type='submit'
                    bgColor='black'
                    color='white'
                    size='lg'
                    data-test-id='submit-button'
                >
                    Зарегистрироваться
                </Button>
            </VStack>
        </VStack>
    );
};

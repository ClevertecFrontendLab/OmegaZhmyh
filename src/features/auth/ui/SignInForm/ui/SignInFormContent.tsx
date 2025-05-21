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
import { Field, Form, useFormikContext } from 'formik';
import { useState } from 'react';

import { useHandleTrimBlur } from '~/features/auth/lib/useHandleTrimBlur';
import { FORM_FIELD } from '~/shared/config/chakra-variants';
import { useAppDispatch } from '~/shared/store/hooks';
import { setForgotPasswordModal } from '~/shared/store/notificationSlice';
import { BsEyeFill } from '~/shared/ui/Icons/ui/BsEyeFill';
import { BsEyeSlashFill } from '~/shared/ui/Icons/ui/BsEyeSlashFill';

import { SignInFormValues } from '../types';

export const SignInFormContent = () => {
    const handleTrimBlur = useHandleTrimBlur();
    const { errors, touched } = useFormikContext<SignInFormValues>();
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const onForgotPassword = () => {
        dispatch(setForgotPasswordModal());
    };

    return (
        <Form data-test-id='sign-in-form'>
            <VStack justifyContent='space-between' alignItems='stretch' minH='376px'>
                <VStack spacing='24px'>
                    <FormControl isInvalid={!!errors.login && touched.login}>
                        <FormLabel htmlFor='login'>Логин для входа на сайт</FormLabel>
                        <Field
                            as={Input}
                            name='login'
                            variant={FORM_FIELD}
                            size='lg'
                            placeholder='Введите логин'
                            onBlur={handleTrimBlur}
                            data-test-id='login-input'
                        />
                        <FormErrorMessage>{errors.login}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.password && touched.password}>
                        <FormLabel htmlFor='password'>Пароль</FormLabel>
                        <InputGroup size='lg'>
                            <Field
                                as={Input}
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                variant={FORM_FIELD}
                                size='lg'
                                placeholder='Пароль для сайта'
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
                    <Button
                        variant='unstyled'
                        size='xs'
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
};

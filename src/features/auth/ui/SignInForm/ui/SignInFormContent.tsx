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

import { AUTH_FIELD_NAMES, AUTH_PLACEHOLDERS } from '../../../constants/fields.constants';
import { SignInFormValues } from './SignInForm';

type SignInFormContentProps = {
    isInvalid: boolean;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SignInFormContent = ({ isInvalid, onInputChange }: SignInFormContentProps) => {
    const dispatch = useAppDispatch();

    const handleTrimBlur = useHandleTrimBlur();

    const { errors, touched } = useFormikContext<SignInFormValues>();

    const [showPassword, setShowPassword] = useState(false);

    const onForgotPassword = () => {
        dispatch(setForgotPasswordModal());
    };

    return (
        <Form data-test-id='sign-in-form'>
            <VStack spacing='24px'>
                <FormControl isInvalid={(!!errors.login && touched.login) || isInvalid}>
                    <FormLabel htmlFor='login'>Логин для входа на сайт</FormLabel>
                    <Field
                        as={Input}
                        name={AUTH_FIELD_NAMES.LOGIN}
                        variant={FORM_FIELD}
                        size='lg'
                        placeholder={AUTH_PLACEHOLDERS.LOGIN_ENTER}
                        onBlur={handleTrimBlur}
                        data-test-id='login-input'
                        onChange={onInputChange}
                    />
                    {errors.login && <FormErrorMessage>{errors.login}</FormErrorMessage>}
                </FormControl>

                <FormControl isInvalid={(!!errors.password && touched.password) || isInvalid}>
                    <FormLabel htmlFor='password'>Пароль</FormLabel>
                    <InputGroup size='lg'>
                        <Field
                            as={Input}
                            name={AUTH_FIELD_NAMES.PASSWORD}
                            type={showPassword ? 'text' : 'password'}
                            variant={FORM_FIELD}
                            size='lg'
                            placeholder={AUTH_PLACEHOLDERS.PASSWORD_ENTER}
                            data-test-id='password-input'
                            onChange={onInputChange}
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
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </InputRightElement>
                    </InputGroup>
                    {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
                </FormControl>
            </VStack>

            <VStack spacing='16px' alignItems='stretch' mt='112px'>
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
                    fontSize='md'
                    fontWeight='semibold'
                    textAlign='center'
                    onClick={onForgotPassword}
                    data-test-id='forgot-password'
                >
                    Забыли логин или пароль?
                </Button>
            </VStack>
        </Form>
    );
};

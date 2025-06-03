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

import { SignupRequest } from '~/features/auth/types/auth.types';
import { FORM_FIELD } from '~/shared/config/chakra-variants.constants';
import { BsEyeFill, BsEyeSlashFill } from '~/shared/ui/icon';

import { AUTH_FIELD_NAMES, AUTH_PLACEHOLDERS } from '../../../constants/fields.constants';

export const SecondStep = () => {
    const { errors, touched, handleBlur, setFieldValue } = useFormikContext<SignupRequest>();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleTrimBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFieldValue(name, value.trim());
        handleBlur({ target: { name, value: value.trim() } });
    };

    return (
        <VStack spacing='48px' alignItems='stretch' justifyContent='space-between' minH='376px'>
            <VStack spacing='24px'>
                <FormControl isInvalid={!!errors.login && touched.login}>
                    <FormLabel htmlFor='login'>Логин для входа на сайт</FormLabel>
                    <Field
                        as={Input}
                        name={AUTH_FIELD_NAMES.LOGIN}
                        size='lg'
                        variant={FORM_FIELD}
                        placeholder={AUTH_PLACEHOLDERS.LOGIN}
                        data-test-id='login-input'
                        onBlur={handleTrimBlur}
                    />
                    <FormHelperText>Логин не менее 5 символов, только латиница</FormHelperText>
                    <FormErrorMessage>{errors.login}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password && touched.password}>
                    <FormLabel htmlFor='password'>Пароль</FormLabel>
                    <InputGroup size='lg'>
                        <Field
                            as={Input}
                            name={AUTH_FIELD_NAMES.PASSWORD}
                            size='lg'
                            type={showPassword ? 'text' : 'password'}
                            variant={FORM_FIELD}
                            placeholder={AUTH_PLACEHOLDERS.PASSWORD}
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
                <FormControl isInvalid={!!errors.passwordConfirm && touched.passwordConfirm}>
                    <FormLabel htmlFor='passwordConfirm'>Повторите пароль</FormLabel>
                    <InputGroup size='lg'>
                        <Field
                            as={Input}
                            name={AUTH_FIELD_NAMES.PASSWORD_CONFIRM}
                            size='lg'
                            type={showConfirmPassword ? 'text' : 'password'}
                            variant={FORM_FIELD}
                            placeholder={AUTH_PLACEHOLDERS.PASSWORD_CONFIRM}
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

                    <FormErrorMessage>{errors.passwordConfirm}</FormErrorMessage>
                </FormControl>
            </VStack>

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
    );
};

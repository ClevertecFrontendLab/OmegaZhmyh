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

import { useHandleTrimBlur } from '~/features/auth/lib/useHandleTrimBlur';
import { ResetPasswordRequest } from '~/features/auth/types/auth.types';
import { FORM_FIELD } from '~/shared/config/chakra-variants';
import { BsEyeFill } from '~/shared/ui/Icons/ui/BsEyeFill';
import { BsEyeSlashFill } from '~/shared/ui/Icons/ui/BsEyeSlashFill';

export const ResetPasswordStep = () => {
    const { errors, touched } = useFormikContext<ResetPasswordRequest>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleTrimBlur = useHandleTrimBlur();

    return (
        <VStack spacing='24px'>
            <FormControl isInvalid={!!errors.login && touched.login}>
                <FormLabel htmlFor='login' fontWeight='normal' color='black'>
                    Логин для входа на сайт
                </FormLabel>
                <Field
                    as={Input}
                    name='login'
                    size='lg'
                    variant={FORM_FIELD}
                    placeholder='Логин'
                    data-test-id='login-input'
                    onBlur={handleTrimBlur}
                />
                <FormHelperText>Логин не менее 5 символов, только латиница</FormHelperText>
                <FormErrorMessage>{errors.login}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel htmlFor='password' fontWeight='normal' color='black'>
                    Новый пароль
                </FormLabel>
                <InputGroup size='lg'>
                    <Field
                        as={Input}
                        name='password'
                        size='lg'
                        type={showPassword ? 'text' : 'password'}
                        variant={FORM_FIELD}
                        placeholder='Новый пароль'
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
                <FormLabel htmlFor='passwordConfirm' fontWeight='normal' color='black'>
                    Повторите пароль
                </FormLabel>
                <InputGroup size='lg'>
                    <Field
                        as={Input}
                        name='passwordConfirm'
                        size='lg'
                        type={showConfirmPassword ? 'text' : 'password'}
                        variant={FORM_FIELD}
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
                <FormErrorMessage>{errors.passwordConfirm}</FormErrorMessage>
            </FormControl>

            <Button
                type='submit'
                bgColor='black'
                color='white'
                size='lg'
                w='full'
                data-test-id='submit-button'
            >
                Сохранить
            </Button>
        </VStack>
    );
};

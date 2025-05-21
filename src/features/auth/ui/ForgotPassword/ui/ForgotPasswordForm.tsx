import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Image,
    Input,
    Text,
} from '@chakra-ui/react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';

import { useForgotPasswordMutation } from '~/features/auth/api/authApi';
import { isErrorResponse } from '~/features/auth/types/auth.types';
import { forgotPasswordSchema } from '~/features/auth/validation/auth.validation';
import breakfast from '~/shared/assets/breakfast.png';
import { FORM_FIELD } from '~/shared/config/chakra-variants';
import { useAppDispatch, useAppSelector } from '~/shared/store/hooks';
import {
    clearForgotPasswordModal,
    selectForgotPasswordModal,
    setVerificationErrorModal,
    setVerifyOtpModal,
} from '~/shared/store/notificationSlice';
import { ModalNotification } from '~/shared/ui/ModalNotification';
import { useErrorAlert } from '~/shared/ui/SnackbarAlert';

const FORGOT_PASSWORD_FORM_ERROR_MESSAGES = {
    EMAIL_NOT_FOUND: 'Такого e-mail нет',
    SERVER_ERROR: 'Ошибка сервера',
    UNKNOWN_ERROR: 'Неизвестная ошибка',
    TRY_AGAIN: 'Попробуйте немного позже',
    EMAIL_NOT_FOUND_MESSAGE: 'Попробуйте другой e-mail или проверьте правильность его написания',
} as const;

export const ForgotPasswordForm = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectForgotPasswordModal);

    const { handleError } = useErrorAlert();
    const [forgotPassword] = useForgotPasswordMutation();
    const [isInvalid, setIsInvalid] = useState(false);

    const onClose = () => dispatch(clearForgotPasswordModal());

    const onSubmit = async (
        values: { email: string },
        { resetForm }: FormikHelpers<{ email: string }>,
    ) => {
        try {
            await forgotPassword(values).unwrap();
            dispatch(clearForgotPasswordModal());
            dispatch(setVerifyOtpModal({ email: values.email }));
            dispatch(setVerificationErrorModal());
        } catch (error) {
            if (error && isErrorResponse(error)) {
                resetForm();
                setIsInvalid(true);
                if (error.status === 403) {
                    handleError({
                        errorTitle: FORGOT_PASSWORD_FORM_ERROR_MESSAGES.EMAIL_NOT_FOUND,
                        errorMessage: FORGOT_PASSWORD_FORM_ERROR_MESSAGES.EMAIL_NOT_FOUND_MESSAGE,
                    });
                } else if (error.status === 500) {
                    handleError({
                        errorTitle: FORGOT_PASSWORD_FORM_ERROR_MESSAGES.SERVER_ERROR,
                        errorMessage: FORGOT_PASSWORD_FORM_ERROR_MESSAGES.TRY_AGAIN,
                    });
                } else {
                    handleError({
                        errorTitle: FORGOT_PASSWORD_FORM_ERROR_MESSAGES.UNKNOWN_ERROR,
                        errorMessage: FORGOT_PASSWORD_FORM_ERROR_MESSAGES.TRY_AGAIN,
                    });
                }
            }
        }
    };

    return (
        <ModalNotification isOpen={isOpen} onClose={onClose} dataTestId='send-email-modal'>
            <Image
                src={breakfast}
                boxSize={{ base: '108px', lg: '206px' }}
                mx='auto'
                alt='email-code-verification'
            />
            <Box>
                <Text mt='16px' textAlign='center' color='blackAlpha.900'>
                    Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код
                </Text>
            </Box>
            <Formik
                initialValues={{ email: '' }}
                validationSchema={forgotPasswordSchema}
                onSubmit={onSubmit}
            >
                {({ errors, handleChange }) => (
                    <Form>
                        <FormControl isInvalid={isInvalid || !!errors.email}>
                            <FormLabel htmlFor='email'>Ваш e-mail</FormLabel>
                            <Field
                                as={Input}
                                name='email'
                                type='email'
                                size='lg'
                                variant={FORM_FIELD}
                                color='blackAlpha.500'
                                placeholder='e-mail'
                                data-test-id='email-input'
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                    setIsInvalid(false);
                                }}
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                        <Button
                            type='submit'
                            mt='24px'
                            size='lg'
                            w='full'
                            bg='black'
                            color='white'
                            data-test-id='submit-button'
                        >
                            Получить код
                        </Button>
                    </Form>
                )}
            </Formik>
            <Box color='blackAlpha.600' textAlign='center' fontSize='xs'>
                Не пришло письмо? Проверьте папку Спам.
            </Box>
        </ModalNotification>
    );
};

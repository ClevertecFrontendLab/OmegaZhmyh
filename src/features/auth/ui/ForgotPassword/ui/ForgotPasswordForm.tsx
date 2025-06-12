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

import { isErrorResponse } from '~/features/auth/';
import { useForgotPasswordMutation } from '~/features/auth/api/authApi';
import { forgotPasswordSchema } from '~/features/auth/model/auth.validation';
import breakfast from '~/shared/assets/breakfast.png';
import { FORM_FIELD } from '~/shared/config';
import { HTTP_STATUS, SERVER_ERROR_MESSAGES } from '~/shared/config';
import { useAppDispatch, useAppSelector } from '~/shared/store/hooks';
import {
    clearForgotPasswordModal,
    selectForgotPasswordModal,
    setVerificationErrorModal,
    setVerifyOtpModal,
} from '~/shared/store/notificationSlice';
import { useErrorAlert } from '~/shared/ui/alert';
import { ModalNotification } from '~/shared/ui/modal-notification';

import { AUTH_FIELD_NAMES, AUTH_PLACEHOLDERS } from '../../fields.constants';
import { FORGOT_PASSWORD_FORM_ERROR_MESSAGES } from '../../form-messages.constants';

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
                if (error.status === HTTP_STATUS.FORBIDDEN) {
                    handleError({
                        errorTitle: FORGOT_PASSWORD_FORM_ERROR_MESSAGES.EMAIL_NOT_FOUND,
                        errorMessage: FORGOT_PASSWORD_FORM_ERROR_MESSAGES.EMAIL_NOT_FOUND_MESSAGE,
                    });
                } else if (error.status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
                    handleError({
                        errorTitle: SERVER_ERROR_MESSAGES.SERVER_ERROR,
                        errorMessage: SERVER_ERROR_MESSAGES.SERVER_ERROR_MESSAGE,
                    });
                } else {
                    handleError({
                        errorTitle: SERVER_ERROR_MESSAGES.SERVER_UNKNOWN_ERROR,
                        errorMessage: SERVER_ERROR_MESSAGES.SERVER_ERROR_MESSAGE,
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
                <Text
                    mt='32px'
                    mb='16px'
                    textAlign='center'
                    fontSize='md'
                    color='blackAlpha.900'
                    px={{ base: '0px', lg: '20px' }}
                >
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
                            <FormLabel htmlFor={AUTH_FIELD_NAMES.EMAIL}>Ваш e-mail</FormLabel>
                            <Field
                                as={Input}
                                name={AUTH_FIELD_NAMES.EMAIL}
                                type='email'
                                size='lg'
                                variant={FORM_FIELD}
                                color='blackAlpha.500'
                                placeholder={AUTH_PLACEHOLDERS.EMAIL}
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
            <Box color='blackAlpha.600' textAlign='center' fontSize='xs' mt='24px'>
                Не пришло письмо? Проверьте папку Спам.
            </Box>
        </ModalNotification>
    );
};

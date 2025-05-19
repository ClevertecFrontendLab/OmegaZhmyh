import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Image,
    Input,
    Modal,
    ModalContent,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';

import { useForgotPasswordMutation } from '~/features/auth/api/authApi';
import { isErrorResponse } from '~/features/auth/types/auth.types';
import { forgotPasswordSchema } from '~/features/auth/validation/auth.validation';
import breakfast from '~/shared/assets/breakfast.png';
import { useAppDispatch, useAppSelector } from '~/shared/store/hooks';
import {
    clearForgotPasswordModal,
    selectForgotPasswordModal,
    setVerificationErrorModal,
    setVerifyOtpModal,
} from '~/shared/store/notificationSlice';
import { BsXCircle } from '~/shared/ui/Icons';
import { useErrorAlert } from '~/shared/ui/SnackbarAlert';

export const ForgotPasswordForm = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectForgotPasswordModal);
    const onClose = () => dispatch(clearForgotPasswordModal());
    const { handleError } = useErrorAlert();
    const [forgotPassword] = useForgotPasswordMutation();
    const [isInvalid, setIsInvalid] = useState(false);

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
                        errorTitle: 'Такого e-mail нет',
                        errorMessage:
                            'Попробуйте другой e-mail или проверьте правильность его написания',
                    });
                } else if (error.status === 500) {
                    handleError({
                        errorTitle: 'Ошибка сервера',
                        errorMessage: 'Попробуйте немного позже.',
                    });
                } else {
                    handleError({
                        errorTitle: 'Неизвестная ошибка',
                        errorMessage: 'Попробуйте немного позже.',
                    });
                }
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                gap='32px'
                alignItems='stretch'
                p='32px'
                borderRadius='16px'
                maxW={{ base: '316px', lg: '396px' }}
                data-test-id='send-email-modal'
            >
                <IconButton
                    aria-label='Закрыть'
                    icon={<BsXCircle boxSize='24px' />}
                    position='absolute'
                    top='24px'
                    right='24px'
                    size='xs'
                    variant='unstyled'
                    onClick={onClose}
                    data-test-id='close-button'
                />

                <Image
                    src={breakfast}
                    boxSize={{ base: '108px', lg: '206px' }}
                    mx='auto'
                    alt='email-code-verification'
                />
                <Box>
                    <Text mt='16px' textAlign='center' color='blackAlpha.900'>
                        Для восстановления входа введите ваш e-mail, куда можно отправить уникальный
                        код
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
            </ModalContent>
        </Modal>
    );
};

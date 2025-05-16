import {
    Box,
    Button,
    FormControl,
    FormLabel,
    IconButton,
    Image,
    Input,
    Modal,
    ModalContent,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

import { useForgotPasswordMutation } from '~/features/auth/api/authApi';
import { forgotPasswordSchema } from '~/features/auth/validation/auth.validation';
import breakfast from '~/shared/assets/breakfast.png';
import { useAppDispatch, useAppSelector } from '~/shared/store/hooks';
import {
    clearForgotPasswordModal,
    selectForgotPasswordModal,
} from '~/shared/store/notificationSlice';
import { BsXCircle } from '~/shared/ui/Icons';
import { useErrorAlert } from '~/shared/ui/SnackbarAlert';

export const ForgotPasswordForm = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectForgotPasswordModal);
    const onClose = () => dispatch(clearForgotPasswordModal());
    const { handleError } = useErrorAlert();
    const [forgotPassword] = useForgotPasswordMutation();

    const onSubmit = async (values: { email: string }) => {
        try {
            await forgotPassword(values).unwrap();
        } catch (error) {
            if (error && typeof error === 'object' && 'status' in error && error.status === 403) {
                console.log(error);
                handleError({
                    errorTitle: 'Неверный логин или пароль',
                    errorMessage: 'Попробуйте снова.',
                });
            }
            if (error && typeof error === 'object' && 'status' in error && error.status === 500) {
                handleError({
                    errorTitle: 'Ошибка сервера',
                    errorMessage: 'Попробуйте немного позже.',
                });
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
                    <Form>
                        <FormControl>
                            <FormLabel htmlFor='email'>Ваш e-mail</FormLabel>
                            <Field as={Input} name='email' type='email' placeholder='e-mail' />
                        </FormControl>
                        <Button type='submit' size='lg' w='full' bg='black' color='white'>
                            Получить код
                        </Button>
                    </Form>
                </Formik>
                <Box color='blackAlpha.600' textAlign='center' fontSize='xs'>
                    Не пришло письмо? Проверьте папку Спам.
                </Box>
            </ModalContent>
        </Modal>
    );
};

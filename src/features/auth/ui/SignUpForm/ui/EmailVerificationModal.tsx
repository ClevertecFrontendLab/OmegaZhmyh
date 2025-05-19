import { Box, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import verificationImage from '~/shared/assets/email-code-verification2.png';
import { ROUTES } from '~/shared/config/routes';
import { useAppDispatch, useAppSelector } from '~/shared/store/hooks';
import {
    clearEmailVerificationModal,
    selectEmailVerificationModal,
    selectEmailVerificationModalEmail,
} from '~/shared/store/notificationSlice';
import { ModalNotification } from '~/shared/ui/ModalNotification';

export const EmailVerificationModal = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const email = useAppSelector(selectEmailVerificationModalEmail);
    const isEmailVerificationModal = useAppSelector(selectEmailVerificationModal);
    const onEmailVerificationModalClose = () => {
        dispatch(clearEmailVerificationModal());
        navigate('/' + ROUTES.SIGN_IN);
    };
    return (
        <ModalNotification
            isOpen={isEmailVerificationModal}
            onClose={onEmailVerificationModalClose}
            dataTestId='sign-up-success-modal'
        >
            <Image
                src={verificationImage}
                boxSize={{ base: '108px', lg: '206px' }}
                mx='auto'
                alt='email-code-verification'
            />
            <Box>
                <Text textAlign='center' fontSize='2xl' fontWeight='bold'>
                    Остался последний шаг. Нужно верифицировать ваш e-mail
                </Text>
                <Text mt='16px' textAlign='center' color='blackAlpha.900'>
                    Мы отправили вам на почту <Text fontWeight='semibold'>{email}</Text> ссылку для
                    верификации.
                </Text>
            </Box>
            <Box color='blackAlpha.600' textAlign='center' fontSize='xs'>
                Не пришло письмо? Проверьте папку Спам. По другим вопросам свяжитесь с поддержкой
            </Box>
        </ModalNotification>
    );
};

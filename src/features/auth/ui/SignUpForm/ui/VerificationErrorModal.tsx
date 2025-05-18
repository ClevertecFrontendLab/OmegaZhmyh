import { Box, Image, Link, Text } from '@chakra-ui/react';

import verificationFailed from '~/shared/assets/verification-failed.png';
import { useAppDispatch, useAppSelector } from '~/shared/store/hooks';
import {
    clearVerificationErrorModal,
    selectVerificationErrorModal,
} from '~/shared/store/notificationSlice';
import { ModalNotification } from '~/shared/ui/ModalNotification';

export const VerificationErrorModal = () => {
    const dispatch = useAppDispatch();
    const onVerificationFailedClose = () => dispatch(clearVerificationErrorModal());
    const isVerificationFailed = useAppSelector(selectVerificationErrorModal);
    return (
        <ModalNotification
            isOpen={isVerificationFailed}
            onClose={onVerificationFailedClose}
            dataTestId='email-verification-failed-modal'
        >
            <Image
                src={verificationFailed}
                boxSize={{ base: '108px', lg: '206px' }}
                mx='auto'
                alt='email-code-verification'
            />
            <Box>
                <Text textAlign='center' fontSize='2xl' fontWeight='bold'>
                    Упс! Что-то пошло не так
                </Text>
                <Text mt='16px' textAlign='center' color='blackAlpha.900'>
                    Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться
                    снова.
                </Text>
            </Box>
            <Box color='blackAlpha.600' textAlign='center' fontSize='xs'>
                <Text>
                    Остались вопросы? Свяжитесь{' '}
                    <Link textDecor='underline' href='mailto:support@example.com'>
                        с поддержкой
                    </Link>
                </Text>
            </Box>
        </ModalNotification>
    );
};

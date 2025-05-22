import { Image, Link, Text } from '@chakra-ui/react';

import verificationFailed from '~/shared/assets/verification-failed.png';
import { useAppDispatch, useAppSelector } from '~/shared/store/hooks';
import {
    clearVerificationErrorModal,
    selectVerificationErrorModal,
} from '~/shared/store/notificationSlice';
import { ModalNotification } from '~/shared/ui/ModalNotification';

export const VerificationErrorModal = () => {
    const dispatch = useAppDispatch();

    const isVerificationFailed = useAppSelector(selectVerificationErrorModal);
    const onVerificationFailedClose = () => dispatch(clearVerificationErrorModal());

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
            <Text textAlign='center' fontSize='2xl' fontWeight='bold' mt='32px'>
                Упс! Что-то пошло не так
            </Text>
            <Text textAlign='center' color='blackAlpha.900' mt='16px'>
                Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться снова.
            </Text>
            <Text color='blackAlpha.600' textAlign='center' fontSize='xs' mt='32px'>
                Остались вопросы? Свяжитесь{' '}
                <Link textDecor='underline' href='mailto:support@example.com'>
                    с поддержкой
                </Link>
            </Text>
        </ModalNotification>
    );
};

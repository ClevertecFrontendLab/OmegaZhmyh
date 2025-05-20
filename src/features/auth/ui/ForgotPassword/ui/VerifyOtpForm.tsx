import { Box, HStack, Image, Link, PinInput, PinInputField, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { useVerifyOtpMutation } from '~/features/auth/api/authApi';
import { isErrorResponse } from '~/features/auth/types/auth.types';
import emailCodeVerification from '~/shared/assets/email-code-verification.png';
import { setAuthLoading } from '~/shared/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/shared/store/hooks';
import {
    clearVerifyOtpModal,
    selectVerifyOtpModal,
    selectVerifyOtpModalEmail,
    setAccountRecoveryModal,
} from '~/shared/store/notificationSlice';
import { ModalNotification } from '~/shared/ui/ModalNotification';
import { useErrorAlert } from '~/shared/ui/SnackbarAlert';

export const VerifyOtpForm = () => {
    const dispatch = useAppDispatch();
    const isVerifyOtpForm = useAppSelector(selectVerifyOtpModal);
    const email = useAppSelector(selectVerifyOtpModalEmail);
    const [otp, setOtp] = useState<string>('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [verifyOtp] = useVerifyOtpMutation();
    const { handleError } = useErrorAlert();

    const onVerifyOtpFormClose = () => {
        setOtp('');
        setIsInvalid(false);
        dispatch(clearVerifyOtpModal());
    };

    const handleOtpChange = async (value: string) => {
        setOtp(value);
        setIsInvalid(false);
        if (value.length === 6) {
            try {
                dispatch(setAuthLoading(true));
                await verifyOtp({ email, otpToken: value }).unwrap();
                dispatch(clearVerifyOtpModal());
                dispatch(setAccountRecoveryModal({ email }));
            } catch (error) {
                if (error && isErrorResponse(error)) {
                    if (error.status === 403) {
                        setOtp('');
                        setIsInvalid(true);
                    } else {
                        setOtp('');
                        handleError({
                            errorTitle: 'Ошибка сервера',
                            errorMessage: 'Попробуйте немного позже.',
                        });
                    }
                }
            } finally {
                dispatch(setAuthLoading(false));
            }
        }
    };

    return (
        <ModalNotification
            isOpen={isVerifyOtpForm}
            onClose={onVerifyOtpFormClose}
            dataTestId='verification-code-modal'
        >
            <Image
                src={emailCodeVerification}
                boxSize={{ base: '108px', lg: '206px' }}
                mx='auto'
                alt='email-code-verification'
            />
            <Box>
                {isInvalid ? (
                    <Text fontSize='2xl' fontWeight='bold'>
                        Неверный код
                    </Text>
                ) : null}
                <Text mt='16px' textAlign='center' color='blackAlpha.900'>
                    Мы отправили вам на e-mail <Text fontWeight='semibold'>{email}</Text>{' '}
                    шестизначный код. Введите его ниже.
                </Text>
            </Box>
            <HStack>
                <PinInput onChange={handleOtpChange} value={otp} isInvalid={isInvalid}>
                    <PinInputField data-test-id='verification-code-input-1' />
                    <PinInputField data-test-id='verification-code-input-2' />
                    <PinInputField data-test-id='verification-code-input-3' />
                    <PinInputField data-test-id='verification-code-input-4' />
                    <PinInputField data-test-id='verification-code-input-5' />
                    <PinInputField data-test-id='verification-code-input-6' />
                </PinInput>
            </HStack>
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

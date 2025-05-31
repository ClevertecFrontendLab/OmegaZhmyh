import { Box, HStack, Image, Link, PinInput, PinInputField, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { useVerifyOtpMutation } from '~/features/auth/api/authApi';
import { isErrorResponse } from '~/features/auth/types/auth.types';
import emailCodeVerification from '~/shared/assets/email-code-verification.png';
import { SERVER_ERROR_MESSAGES } from '~/shared/config/form-messages.constants.ts';
import { HTTP_STATUS } from '~/shared/config/http-status-codes.constants';
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

const OTP_LENGTH = 6;

export const VerifyOtpForm = () => {
    const dispatch = useAppDispatch();
    const isVerifyOtpForm = useAppSelector(selectVerifyOtpModal);
    const email = useAppSelector(selectVerifyOtpModalEmail);

    const [otp, setOtp] = useState('');
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
        if (value.length === OTP_LENGTH) {
            try {
                dispatch(setAuthLoading(true));
                await verifyOtp({ email, otpToken: value }).unwrap();
                dispatch(clearVerifyOtpModal());
                dispatch(setAccountRecoveryModal({ email }));
            } catch (error) {
                if (error && isErrorResponse(error)) {
                    if (error.status === HTTP_STATUS.FORBIDDEN) {
                        setOtp('');
                        setIsInvalid(true);
                    } else {
                        setOtp('');
                        handleError({
                            errorTitle: SERVER_ERROR_MESSAGES.SERVER_ERROR,
                            errorMessage: SERVER_ERROR_MESSAGES.SERVER_ERROR_MESSAGE,
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
            <Box mt='32px'>
                {isInvalid ? (
                    <Text textAlign='center' fontSize='2xl' fontWeight='bold' mb='16px'>
                        Неверный код
                    </Text>
                ) : null}
                <Text textAlign='center' color='blackAlpha.900'>
                    Мы отправили вам на e-mail <Text fontWeight='semibold'>{email}</Text>{' '}
                    шестизначный код. Введите его ниже.
                </Text>
            </Box>
            <HStack mt='16px' justifyContent='center' gap='6px'>
                <PinInput onChange={handleOtpChange} value={otp} isInvalid={isInvalid}>
                    {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                        <PinInputField
                            key={index}
                            data-test-id={`verification-code-input-${index + 1}`}
                        />
                    ))}
                </PinInput>
            </HStack>
            <Text color='blackAlpha.600' textAlign='center' fontSize='xs' mt='24px'>
                Остались вопросы? Свяжитесь{' '}
                <Link textDecor='underline' href='#'>
                    с поддержкой
                </Link>
            </Text>
        </ModalNotification>
    );
};

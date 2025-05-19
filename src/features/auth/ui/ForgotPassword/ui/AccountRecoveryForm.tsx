import { Text } from '@chakra-ui/react';
import { Formik } from 'formik';

import { useForgotPasswordMutation } from '~/features/auth/api/authApi';
import { useAppDispatch, useAppSelector } from '~/shared/store/hooks';
import {
    clearVerificationErrorModal,
    selectVerificationErrorModal,
} from '~/shared/store/notificationSlice';
import { ModalNotification } from '~/shared/ui/ModalNotification';
import { useErrorAlert } from '~/shared/ui/SnackbarAlert';

import { SecondStep } from '../../SignUpForm/ui/SecondStep';

export const AccountRecoveryForm = () => {
    const dispatch = useAppDispatch();
    const onVerificationFailedClose = () => dispatch(clearVerificationErrorModal());
    const isVerificationFailed = useAppSelector(selectVerificationErrorModal);
    const [forgotPassword] = useForgotPasswordMutation();
    const { handleError } = useErrorAlert();

    const onSubmit = async (values: { email: string }) => {
        try {
            await forgotPassword(values).unwrap();
            onVerificationFailedClose();
            handleError({
                errorTitle: 'Восстановление данных успешно',
                status: 'success',
            });
        } catch (_error) {
            handleError({
                errorTitle: 'Ошибка сервера',
                errorMessage: 'Попробуйте немного позже',
            });
        }
    };

    return (
        <ModalNotification
            isOpen={isVerificationFailed}
            onClose={onVerificationFailedClose}
            dataTestId='reset-credentials-modal'
        >
            <Text textAlign='center' fontSize='2xl' fontWeight='bold'>
                Восстановление аккаунта
            </Text>
            <Formik initialValues={{ email: '' }} onSubmit={onSubmit}>
                <SecondStep />
            </Formik>
        </ModalNotification>
    );
};

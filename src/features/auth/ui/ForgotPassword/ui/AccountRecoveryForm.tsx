import { Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import { useResetPasswordMutation } from '~/features/auth/api/authApi';
import { ResetPasswordRequest } from '~/features/auth/types/auth.types';
import { resetPasswordSchema } from '~/features/auth/validation/auth.validation';
import { setAuthLoading } from '~/shared/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/shared/store/hooks';
import {
    clearAccountRecoveryModal,
    selectAccountRecoveryModal,
    selectAccountRecoveryModalEmail,
} from '~/shared/store/notificationSlice';
import { ModalNotification } from '~/shared/ui/ModalNotification';
import { useErrorAlert } from '~/shared/ui/SnackbarAlert';

import { ResetPasswordStep } from './ResetPasswordStep';

export const AccountRecoveryForm = () => {
    const dispatch = useAppDispatch();
    const onAccountRecoveryModalClose = () => dispatch(clearAccountRecoveryModal());
    const isAccountRecoveryModalOpen = useAppSelector(selectAccountRecoveryModal);
    const email = useAppSelector(selectAccountRecoveryModalEmail);
    const [forgotPassword] = useResetPasswordMutation();
    const { handleError } = useErrorAlert();

    const onSubmit = async (values: ResetPasswordRequest) => {
        try {
            dispatch(setAuthLoading(true));
            await forgotPassword(values).unwrap();
            onAccountRecoveryModalClose();
            handleError({
                errorTitle: 'Восстановление данных успешно',
                status: 'success',
            });
        } catch (_error) {
            handleError({
                errorTitle: 'Ошибка сервера',
                errorMessage: 'Попробуйте немного позже',
            });
        } finally {
            dispatch(setAuthLoading(false));
        }
    };

    return (
        <ModalNotification
            isOpen={isAccountRecoveryModalOpen}
            onClose={onAccountRecoveryModalClose}
            dataTestId='reset-credentials-modal'
        >
            <Text textAlign='center' fontSize='2xl' fontWeight='bold'>
                Восстановление аккаунта
            </Text>
            <Formik
                initialValues={{
                    login: '',
                    password: '',
                    passwordConfirm: '',
                    email,
                }}
                validationSchema={resetPasswordSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <ResetPasswordStep />
                </Form>
            </Formik>
        </ModalNotification>
    );
};

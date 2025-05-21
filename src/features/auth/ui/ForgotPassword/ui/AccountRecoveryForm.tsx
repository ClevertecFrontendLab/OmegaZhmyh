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

const initialValues: ResetPasswordRequest = {
    login: '',
    password: '',
    passwordConfirm: '',
    email: '',
};

const ACCOUNT_RECOVERY_FORM_ERROR_MESSAGES = {
    SERVER_ERROR: 'Ошибка сервера',
    UNKNOWN_ERROR: 'Неизвестная ошибка',
    TRY_AGAIN: 'Попробуйте немного позже.',
} as const;

const ACCOUNT_RECOVERY_FORM_SUCCESS_MESSAGES = {
    SUCCESS: 'Восстановление данных успешно',
} as const;

export const AccountRecoveryForm = () => {
    const dispatch = useAppDispatch();
    const email = useAppSelector(selectAccountRecoveryModalEmail);

    const onAccountRecoveryModalClose = () => dispatch(clearAccountRecoveryModal());
    const isAccountRecoveryModalOpen = useAppSelector(selectAccountRecoveryModal);

    const [forgotPassword] = useResetPasswordMutation();
    const { handleError } = useErrorAlert();
    const { handleError: handleSuccess } = useErrorAlert(
        {
            base: '50%',
            lg: '25%',
        },
        {
            base: '100px',
            lg: '80px',
        },
    );

    const onSubmit = async (values: ResetPasswordRequest) => {
        try {
            dispatch(setAuthLoading(true));
            await forgotPassword(values).unwrap();
            onAccountRecoveryModalClose();
            handleSuccess({
                errorTitle: ACCOUNT_RECOVERY_FORM_SUCCESS_MESSAGES.SUCCESS,
                status: 'success',
            });
        } catch (_error) {
            handleError({
                errorTitle: ACCOUNT_RECOVERY_FORM_ERROR_MESSAGES.SERVER_ERROR,
                errorMessage: ACCOUNT_RECOVERY_FORM_ERROR_MESSAGES.TRY_AGAIN,
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
                Восстановление
                <br />
                аккаунта
            </Text>
            <Formik
                initialValues={{ ...initialValues, email }}
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

import { Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import { useResetPasswordMutation } from '~/features/auth/api/authApi';
import { ResetPasswordRequest } from '~/features/auth/types/auth.types';
import { resetPasswordSchema } from '~/features/auth/validation/auth.validation';
import { SERVER_ERROR_MESSAGES } from '~/shared/config/form-messages.constants.ts';
import { setAuthLoading } from '~/shared/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/shared/store/hooks';
import {
    clearAccountRecoveryModal,
    selectAccountRecoveryModal,
    selectAccountRecoveryModalEmail,
} from '~/shared/store/notificationSlice';
import { useErrorAlert } from '~/shared/ui/alert';
import { ModalNotification } from '~/shared/ui/modal-notification';

import {
    ACCOUNT_RECOVERY_FORM_SUCCESS_MESSAGES,
    SUCCESS_STATUS,
} from '../../../constants/form-messages.constants.ts';
import { ResetPasswordStep } from './ResetPasswordStep';

const initialValues: ResetPasswordRequest = {
    login: '',
    password: '',
    passwordConfirm: '',
    email: '',
};

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
            base: '95px',
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
                status: SUCCESS_STATUS,
            });
        } catch (_error) {
            handleError({
                errorTitle: SERVER_ERROR_MESSAGES.SERVER_ERROR,
                errorMessage: SERVER_ERROR_MESSAGES.SERVER_ERROR_MESSAGE,
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
            <Text textAlign='center' fontSize='2xl' fontWeight='bold' mb='24px'>
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

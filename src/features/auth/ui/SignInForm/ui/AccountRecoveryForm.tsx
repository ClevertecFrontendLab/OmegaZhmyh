import { Text } from '@chakra-ui/react';
import { Formik } from 'formik';

import { useAppDispatch, useAppSelector } from '~/shared/store/hooks';
import {
    clearVerificationErrorModal,
    selectVerificationErrorModal,
} from '~/shared/store/notificationSlice';
import { ModalNotification } from '~/shared/ui/ModalNotification';

import { SecondStep } from '../../SignUpForm/ui/SecondStep';

export const AccountRecoveryForm = () => {
    const dispatch = useAppDispatch();
    const onVerificationFailedClose = () => dispatch(clearVerificationErrorModal());
    const isVerificationFailed = useAppSelector(selectVerificationErrorModal);

    return (
        <ModalNotification
            isOpen={isVerificationFailed}
            onClose={onVerificationFailedClose}
            dataTestId='reset-credentials-modal'
        >
            <Text textAlign='center' fontSize='2xl' fontWeight='bold'>
                Восстановление аккаунта
            </Text>
            <Formik initialValues={{ email: '' }} onSubmit={() => {}}>
                <SecondStep />
            </Formik>
        </ModalNotification>
    );
};

import { Alert, AlertIcon, CloseButton, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { clearError } from '../model/notificationSlice';
import { selectNotification } from '../model/selectors';

export const SnackbarAlert = () => {
    const { error } = useSelector(selectNotification);
    const dispatch = useDispatch();
    const onClose = () => {
        dispatch(clearError());
    };

    return error ? (
        <Alert
            status='error'
            position='fixed'
            bottom='32px'
            left='50%'
            transform='translateX(-50%)'
            width='auto'
            minWidth='300px'
            maxWidth='90vw'
            borderRadius='md'
            boxShadow='lg'
            zIndex={1400}
            variant='solid'
            padding='16px 24px'
            color='white'
            bg='red.500'
            data-test-id='error-notification'
        >
            <AlertIcon />
            <Text fontWeight='medium' ml={2}>
                {error}
            </Text>
            <Text>Попробуйте поискать снова попозже</Text>
            <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={onClose}
                data-test-id='close-alert-button'
            />
        </Alert>
    ) : null;
};

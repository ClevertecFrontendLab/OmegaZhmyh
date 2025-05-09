import { Alert, AlertIcon, Box, CloseButton, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { clearError, selectError } from '../model/notificationSlice';

export const SnackbarAlert = () => {
    const { errorTitle, errorMessage } = useSelector(selectError);
    const dispatch = useDispatch();
    const onClose = () => {
        dispatch(clearError());
    };

    return errorTitle && errorMessage ? (
        <Alert
            status='error'
            position='fixed'
            bottom={{ base: 'calc(var(--mobile-footer-height) + 16px)', lg: '80px' }}
            left='50%'
            transform='translateX(-50%)'
            width={{ base: '328px', lg: '480px' }}
            minWidth='300px'
            maxWidth='90vw'
            boxShadow='lg'
            zIndex={1400}
            variant='solid'
            padding='16px 24px'
            color='white'
            bg='red.500'
            data-test-id='error-notification'
        >
            <AlertIcon />
            <Box>
                <Text fontWeight='medium'>{errorTitle}</Text>
                <Text>{errorMessage}</Text>
            </Box>
            <CloseButton
                alignSelf='flex-start'
                position='absolute'
                boxSize='11px'
                right='12px'
                top='12px'
                onClick={onClose}
                data-test-id='close-alert-button'
            />
        </Alert>
    ) : null;
};

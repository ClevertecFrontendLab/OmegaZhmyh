import { Alert, AlertIcon, Box, CloseButton, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { clearError, selectNotificationAlert } from '~/shared/store/notificationSlice';

export const SnackbarAlert = () => {
    const { title, message, isOpen, status, left, bottom } = useSelector(selectNotificationAlert);
    const dispatch = useDispatch();
    const onClose = () => {
        dispatch(clearError());
    };

    return isOpen ? (
        <Alert
            status={status}
            position='fixed'
            bottom={bottom ?? 'calc(var(--mobile-footer-height) + 16px)'}
            left={left ?? '50%'}
            transform='translateX(-50%)'
            width={{ base: '328px', lg: '400px' }}
            boxShadow='lg'
            zIndex='toast'
            variant='solid'
            padding='16px 24px'
            color='white'
            data-test-id='error-notification'
        >
            <AlertIcon />
            <Box>
                <Text fontWeight='medium'>{title}</Text>
                <Text>{message}</Text>
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

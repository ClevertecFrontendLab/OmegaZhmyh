import { Alert, AlertIcon } from '@chakra-ui/react';

export const ErrorAlert = () => (
    <Alert status='error'>
        <AlertIcon />
        There was an error processing your request
    </Alert>
);

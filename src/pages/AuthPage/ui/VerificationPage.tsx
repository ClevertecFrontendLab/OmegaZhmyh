import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import {
    SUCCESS_STATUS,
    VERIFICATION_SUCCESS,
} from '~/features/auth/constants/form-messages.constants.ts';
import { ROUTES } from '~/shared/config/routes';
import { useAppDispatch } from '~/shared/store/hooks';
import { setVerificationErrorModal } from '~/shared/store/notificationSlice';
import { useErrorAlert } from '~/shared/ui/SnackbarAlert';

export const VerificationPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();

    const { handleError } = useErrorAlert();

    useEffect(() => {
        const emailVerified = searchParams.get('emailVerified');

        if (emailVerified === 'true') {
            handleError({
                errorTitle: VERIFICATION_SUCCESS,
                status: SUCCESS_STATUS,
            });
            navigate(`/${ROUTES.SIGN_IN}`);
        } else {
            navigate(`/${ROUTES.SIGN_UP}`);
            dispatch(setVerificationErrorModal());
        }
    }, [searchParams, navigate, dispatch, handleError]);

    return (
        <Flex
            height='100vh'
            width='100vw'
            bgGradient='linear-gradient(208deg, #eaffc7 0%, #29813f 100%)'
            justifyContent='center'
            alignItems='center'
        >
            <Box bg='white' p={8} borderRadius='lg' boxShadow='lg' textAlign='center'>
                <Text fontSize='xl' fontWeight='bold'>
                    Проверка подтверждения email...
                </Text>
            </Box>
        </Flex>
    );
};

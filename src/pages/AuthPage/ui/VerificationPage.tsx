import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { ROUTES } from '~/shared/config/routes';
import { useAppDispatch } from '~/shared/store/hooks';
import { setVerificationFailedModal } from '~/shared/store/notificationSlice';

export const VerificationPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const toast = useToast();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const emailVerified = searchParams.get('emailVerified');

        if (emailVerified === 'true') {
            toast({
                title: 'Верификация прошла успешно',
                status: 'success',
                duration: 20000,
                isClosable: true,
            });
            navigate(`/${ROUTES.SIGN_IN}`);
        } else {
            navigate(`/${ROUTES.SIGN_UP}`);
            dispatch(setVerificationFailedModal());
        }
    }, [searchParams, navigate, toast, dispatch]);

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

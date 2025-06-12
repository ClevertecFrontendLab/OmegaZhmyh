import { Flex, Spinner } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { useAppSelector, userLoadingSelector } from '~/shared/store';
import { closeBurger } from '~/widgets/layout';

export const FullscreenSpinner = () => {
    const idAppLoading = useAppSelector(userLoadingSelector);
    const dispatch = useDispatch();
    const burgerClose = () => dispatch(closeBurger());
    if (!idAppLoading) return null;
    return (
        <Flex
            h='100vh'
            w='100vw'
            position='fixed'
            justifyContent='center'
            alignItems='center'
            backdropFilter='blur(4px)'
            background='rgba(0, 0, 0, 0.16)'
            zIndex='popover'
            onClick={burgerClose}
            data-test-id='app-loader'
        >
            <Flex
                boxSize={{ base: '134px', md: '206px' }}
                justifyContent='center'
                alignItems='center'
                background='radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)'
            >
                <Spinner />
            </Flex>
        </Flex>
    );
};

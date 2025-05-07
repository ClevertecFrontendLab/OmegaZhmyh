import { Flex, Spinner } from '@chakra-ui/react';

export const FullscreenSpinner = () => (
    <Flex
        h='100vh'
        w='100vw'
        position='fixed'
        justifyContent='center'
        alignItems='center'
        backdropFilter='blur(4px)'
        background='rgba(0, 0, 0, 0.16)'
        zIndex='overlay'
        data-test-id='app-loader'
    >
        <Flex
            width='206px'
            height='206px'
            justifyContent='center'
            alignItems='center'
            background='radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)'
        >
            <Spinner />
        </Flex>
    </Flex>
);

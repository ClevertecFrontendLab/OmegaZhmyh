import { Flex, Spinner } from '@chakra-ui/react';

export const AppSpiner = () => (
    <Flex
        boxSize='134px'
        justifyContent='center'
        alignItems='center'
        background='radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)'
        data-test-id='app-spinner'
    >
        <Spinner boxSize='24px' color='black' speed='0.8s' />
    </Flex>
);

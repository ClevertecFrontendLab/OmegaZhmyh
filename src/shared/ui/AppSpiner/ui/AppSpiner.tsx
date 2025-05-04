import { Flex, Spinner } from '@chakra-ui/react';

export const AppSpiner = () => (
    <Flex
        width='134px'
        height='134px'
        justifyContent='center'
        alignItems='center'
        background='radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)'
        data-test-id='app-spinner'
    >
        <Spinner thickness='4px' size='xl' color='lime.400' speed='0.8s' />
    </Flex>
);

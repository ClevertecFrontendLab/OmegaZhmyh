import { Box, Center, Image, Text } from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router';

import ErrorImg from '~/shared/assets/breakfast.png';

export const ErrorPage = () => (
    <Center height='calc(100vh - var(--header-height))' flexDirection='column'>
        <Image src={ErrorImg} boxSize={{ base: '108px', lg: '206px' }} />
        <Box textAlign='center' maxWidth={{ base: '230px', lg: '332px' }} marginTop='32px'>
            <Text as='h1' fontSize='2xl' fontWeight='bold'>
                Упс! Такой страницы нет
            </Text>
            <Text fontSize='md' color='backAlpha.600' marginTop='16px'>
                Можете поискать другой рецепт{' '}
                <RouteLink
                    to='/'
                    style={{ textDecoration: 'underline' }}
                    data-test-id='error-page-go-home'
                >
                    здесь.
                </RouteLink>
            </Text>
        </Box>
    </Center>
);

import { Center, Image, Link, Text } from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router';

import ErrorImg from '~/shared/assets/Breakfast.png';

export const ErrorPage = () => (
    <Center height='calc(100vh - var(--header-height))' flexDirection='column'>
        <Image src={ErrorImg} />
        <Text as='h1' marginTop='32px' fontSize='2xl' fontWeight='bold'>
            Упс! Такой страницы нет
        </Text>
        <Text fontSize='md' color='backAlpha.600'>
            Можете поискать другой рецепт{' '}
            <Link as={RouteLink} to='/' textDecor='underline' data-test-id='error-page-go-home'>
                здесь.
            </Link>
        </Text>
    </Center>
);

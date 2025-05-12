import { Box, Container, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import { SignupForm } from '~/features/auth/ui/SignupForm';

export const SignupPage = () => (
    <Container maxW='container.sm' py={10}>
        <VStack spacing={8}>
            <Heading>Регистрация</Heading>
            <Box w='100%' p={8} borderWidth={1} borderRadius='lg'>
                <SignupForm />
                <Text mt={4} textAlign='center'>
                    Уже есть аккаунт?{' '}
                    <Link as={RouterLink} to='/login' color='blue.500'>
                        Войти
                    </Link>
                </Text>
            </Box>
        </VStack>
    </Container>
);

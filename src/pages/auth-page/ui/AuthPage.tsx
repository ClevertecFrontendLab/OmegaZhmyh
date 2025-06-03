import { Box, Flex, Image, Link, VStack } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router';

import { SignUpForm } from '~/features/auth/';
import { SignInForm } from '~/features/auth/';
import AuthPageImg from '~/shared/assets/auth-page.jpg';
import logo from '~/shared/assets/logo.svg';
import { AUTH_LINK_VARIANT } from '~/shared/config/chakra-variants.constants';
import { ROUTES } from '~/shared/config/routes.constants';

export const AuthPage = () => {
    const location = useLocation();

    const activeTab = location.pathname === ROUTES.SIGN_IN ? 0 : 1;

    return (
        <Flex
            bgGradient='linear-gradient(208deg, #eaffc7 0%, #29813f 100%)'
            justifyContent='center'
            minH='100dvh'
        >
            <VStack
                justifyContent='space-between'
                w={{ base: '100%', lg: '50%' }}
                padding={{ base: '16px', md: '20px' }}
            >
                <Flex
                    marginTop={{ base: '56px', md: '120px', lg: '150px' }}
                    maxW={{ base: '328px', md: '355px', lg: '451px', xl: '461px' }}
                    w='100%'
                    align='stretch'
                    direction='column'
                    flexGrow={1}
                >
                    <Image src={logo} alt='logo' h={{ base: '38px', lg: '64px' }} />
                    <Flex
                        justifyContent='start'
                        flexWrap='wrap'
                        marginTop={{ base: '40px', md: '56px', lg: '80px' }}
                        borderBottom='2px solid'
                        borderColor='blackAlpha.200'
                        width='full'
                    >
                        <Link
                            variant={AUTH_LINK_VARIANT}
                            as={NavLink}
                            to={ROUTES.SIGN_IN}
                            {...(location.pathname === ROUTES.SIGN_IN
                                ? {
                                      'aria-selected': true,
                                  }
                                : { 'aria-selected': false })}
                        >
                            Вход на сайт
                        </Link>
                        <Link
                            variant={AUTH_LINK_VARIANT}
                            as={NavLink}
                            to={ROUTES.SIGN_UP}
                            {...(location.pathname === ROUTES.SIGN_UP
                                ? {
                                      'aria-selected': true,
                                  }
                                : { 'aria-selected': false })}
                        >
                            Регистрация
                        </Link>
                    </Flex>
                    <Flex marginTop='40px' flexDirection='column'>
                        {activeTab === 0 ? <SignInForm /> : <SignUpForm />}
                    </Flex>
                </Flex>
                <Box
                    fontSize='xs'
                    fontWeight='semibold'
                    color='black'
                    padding='10px'
                    alignSelf='start'
                >
                    Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
                </Box>
            </VStack>
            <Flex position='relative' w='50%' display={{ base: 'none', lg: 'flex' }}>
                <Image src={AuthPageImg} alt='food' objectFit='cover' h='100vh' w='100%' />
                <Box
                    position='absolute'
                    bottom='20px'
                    right='20px'
                    color='black'
                    fontSize='xs'
                    fontWeight='semibold'
                    padding='10px'
                >
                    Лучший сервис для ваших кулинарных побед
                </Box>
            </Flex>
        </Flex>
    );
};

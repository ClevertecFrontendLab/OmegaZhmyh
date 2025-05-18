import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router';

import { SignUpForm } from '~/features/auth/';
import { SignInForm } from '~/features/auth/';
import { LINK_VARIANT } from '~/shared/config/chakra-variants';
import { ROUTES } from '~/shared/config/routes';

export const AuthPage = () => {
    const location = useLocation();

    const activeTab = location.pathname === '/' + ROUTES.SIGN_IN ? 0 : 1;

    return (
        <Flex
            height='100vh'
            width='100vw'
            bgGradient='linear-gradient(208deg, #eaffc7 0%, #29813f 100%)'
        >
            <Flex
                marginTop='170px'
                align='center'
                direction='column'
                flexGrow={1}
                position='relative'
            >
                <Box minW='461px'>
                    <Flex align='center' justify='center'>
                        <Image
                            src='/src/shared/assets/logo.svg'
                            alt='logo'
                            h={{ base: '38px', lg: '64px' }}
                        />
                    </Flex>
                    <Flex justifyContent='center' flexWrap='wrap'>
                        <Link
                            variant={LINK_VARIANT}
                            as={NavLink}
                            to={`/${ROUTES.SIGN_IN}`}
                            {...(location.pathname === `/${ROUTES.SIGN_IN}`
                                ? {
                                      'aria-selected': true,
                                  }
                                : { 'aria-selected': false })}
                        >
                            Вход на сайт
                        </Link>
                        <Link
                            variant={LINK_VARIANT}
                            as={NavLink}
                            to={`/${ROUTES.SIGN_UP}`}
                            {...(location.pathname === `/${ROUTES.SIGN_UP}`
                                ? {
                                      'aria-selected': true,
                                  }
                                : { 'aria-selected': false })}
                        >
                            Регистрация
                        </Link>
                    </Flex>
                    <Flex paddingTop='40px'>
                        {activeTab === 0 ? <SignInForm /> : <SignUpForm />}
                    </Flex>
                </Box>
                <Text
                    position='absolute'
                    bottom='30px'
                    left='30px'
                    fontSize='xs'
                    fontWeight='semibold'
                    color='blackAlpha.700'
                >
                    Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
                </Text>
            </Flex>
            {/* Правая часть */}
            <Flex minW={{ base: '732px', xl: '972px' }} position='relative'>
                <Image
                    src='/src/shared/assets/auth-page.jpg'
                    alt='food'
                    objectFit='cover'
                    w='100%'
                    h='100%'
                    borderRadius='0'
                />
                <Box
                    position='absolute'
                    bottom='30px'
                    right='30px'
                    color='blackAlpha.800'
                    fontSize='xs'
                    fontWeight='semibold'
                >
                    Лучший сервис для ваших кулинарных побед
                </Box>
            </Flex>
        </Flex>
    );
};

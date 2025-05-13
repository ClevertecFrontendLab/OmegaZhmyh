import { Box, Flex, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import { SignUpForm } from '~/features/auth/';
import { SignInForm } from '~/features/auth/';
import { ROUTES } from '~/shared/config/routes';

export const AuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const activeTab = location.pathname === '/' + ROUTES.SIGN_IN ? 0 : 1;

    const handleTabChange = (index: number) => {
        navigate('/' + (index === 0 ? ROUTES.SIGN_IN : ROUTES.SIGN_UP));
    };

    return (
        <Flex height='100vh' width='100vw'>
            <Flex
                bgGradient='linear(to-br, #d0f5c7, #a3e4a1)'
                align='center'
                justify='center'
                direction='column'
                flexGrow={1}
                px={{ base: 4, md: 16 }}
                py={8}
                position='relative'
            >
                <Box h='468px' minW='461px'>
                    <Flex align='center' justify='center'>
                        <Image src='/src/shared/assets/logo.svg' alt='logo' h='48px' />
                    </Flex>
                    <Tabs
                        marginTop={{ base: '40px', md: '56px', lg: '80px' }}
                        variant='unstyled'
                        colorScheme='green'
                        isFitted
                        index={activeTab}
                        onChange={handleTabChange}
                    >
                        <TabList mb={6} borderBottom='1px solid #b2d8b2' marginBottom={0}>
                            <Tab
                                flex='none'
                                _selected={{ color: '#2B823F', borderBottom: '2px solid #2B823F' }}
                            >
                                Вход на сайт
                            </Tab>
                            <Tab
                                _selected={{ color: '#2B823F', borderBottom: '2px solid #2B823F' }}
                            >
                                Регистрация
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel paddingTop='40px'>
                                <SignInForm />
                            </TabPanel>
                            <TabPanel paddingTop='40px'>
                                <SignUpForm />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
                <Text position='absolute' bottom={2} left={4} fontSize='xs' color='blackAlpha.700'>
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
                    bottom='20px'
                    right='20px'
                    color='blackAlpha.800'
                    fontSize='sm'
                    textAlign='right'
                >
                    Лучший сервис для ваших кулинарных побед
                </Box>
            </Flex>
        </Flex>
    );
};

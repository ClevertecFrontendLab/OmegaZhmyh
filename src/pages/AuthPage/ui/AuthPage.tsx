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
                    <Tabs
                        marginTop={{ base: '40px', md: '56px', lg: '80px' }}
                        variant='unstyled'
                        colorScheme='green'
                        index={activeTab}
                        onChange={handleTabChange}
                    >
                        <TabList borderBottom='1px solid' borderColor='blackAlpha.200'>
                            <Tab
                                fontSize={{ base: 'md', lg: 'lg' }}
                                fontWeight='medium'
                                padding='12px 24px'
                                color='lime.800'
                                borderBottom='2px solid transparent'
                                _selected={{
                                    color: '#2B823F',
                                    borderColor: 'lime.700',
                                }}
                            >
                                Вход на сайт
                            </Tab>
                            <Tab
                                fontSize={{ base: 'md', lg: 'lg' }}
                                fontWeight='medium'
                                padding='12px 24px'
                                color='lime.800'
                                borderBottom='2px solid transparent'
                                _selected={{
                                    color: '#2B823F',
                                    borderColor: 'lime.700',
                                }}
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

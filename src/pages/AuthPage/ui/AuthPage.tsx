import { Box, Flex, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';

import { SingInForm } from '~/features/sing-in';

export const AuthPage = () => (
    <Flex minH='100vh' direction={{ base: 'column', md: 'row' }}>
        {/* Левая часть */}
        <Flex
            w={{ base: '100%', md: '50%' }}
            bgGradient='linear(to-br, #d0f5c7, #a3e4a1)'
            align='center'
            justify='center'
            direction='column'
            px={{ base: 4, md: 16 }}
            py={8}
            position='relative'
        >
            <Box w='100%' maxW='400px'>
                <Flex align='center' justify='center' mb={8}>
                    <Image src='/src/shared/assets/logo.svg' alt='logo' h='48px' />
                </Flex>
                <Tabs variant='unstyled' colorScheme='green' isFitted>
                    <TabList mb={6} borderBottom='1px solid #b2d8b2'>
                        <Tab _selected={{ color: '#2B823F', borderBottom: '2px solid #2B823F' }}>
                            Вход на сайт
                        </Tab>
                        <Tab _selected={{ color: '#2B823F', borderBottom: '2px solid #2B823F' }}>
                            Регистрация
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel px={0}>
                            <SingInForm />
                        </TabPanel>
                        <TabPanel px={0}>{/* Здесь может быть форма регистрации */}</TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
            <Text position='absolute' bottom={2} left={4} fontSize='xs' color='blackAlpha.700'>
                Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
            </Text>
        </Flex>
        {/* Правая часть */}
        <Flex
            w={{ base: '100%', md: '50%' }}
            align='center'
            justify='center'
            bg='#2d4739'
            position='relative'
            minH={{ base: '40vh', md: '100vh' }}
        >
            <Image
                src='/src/shared/assets/recipe_img/meatball.jpg'
                alt='food'
                objectFit='cover'
                w='100%'
                h='100%'
                maxH='100vh'
                maxW='100vw'
                borderRadius='0'
            />
            <Box
                position='absolute'
                bottom={4}
                right={8}
                color='blackAlpha.800'
                fontSize='sm'
                textAlign='right'
            >
                Лучший сервис для ваших кулинарных побед
            </Box>
        </Flex>
    </Flex>
);

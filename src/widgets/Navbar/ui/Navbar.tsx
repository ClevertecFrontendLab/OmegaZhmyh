import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Stack,
    Tab,
    TabList,
    Tabs,
    Text,
} from '@chakra-ui/react';
import { Link } from 'react-router';

import ExitIcon from '~/shared/assets/exit-icon.svg';
import { NavbarConfig } from '~/shared/config/tabTitles';

export const Navbar = ({ ...props }) => (
    <Box
        width='256px'
        top='var(--header-height)'
        height='calc(100vh - var(--header-height))'
        paddingTop='24px'
        boxShadow='0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)'
        display={{ base: 'none', lg: 'block' }}
        position='fixed'
        as='nav'
        {...props}
    >
        <Accordion variant='navbar' allowMultiple>
            {Object.keys(NavbarConfig).map((tabName) => (
                <AccordionItem key={tabName}>
                    <AccordionButton
                        as={Link}
                        to='/Vegan-cuisine/Main-courses'
                        _expanded={{ bg: 'lime.100', fontWeight: 'bold' }}
                        _hover={{ bg: 'lime.50' }}
                        data-test-id={tabName === 'Веганская кухня' ? 'vegan-cuisine' : null}
                    >
                        <img src={NavbarConfig[tabName].icon} alt={tabName} />
                        <Text flex='1' textAlign='left'>
                            {tabName}
                        </Text>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                        <Tabs variant='navbar' colorScheme='lime'>
                            <TabList>
                                {NavbarConfig[tabName].tabsLinks.map(({ tab }, index) => (
                                    <Tab
                                        key={index}
                                        _hover={{ bg: 'lime.50' }}
                                        as={Link}
                                        to='/Vegan-cuisine/Main-courses'
                                    >
                                        {tab}
                                    </Tab>
                                ))}
                            </TabList>
                        </Tabs>
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>

        <Stack
            height='var(--footer-left-height)'
            paddingX='24px'
            spacing={4}
            align='start'
            as='footer'
        >
            <Text fontSize='xs' color='blackAlpha.400'>
                Версия программы 03.25
            </Text>
            <Text fontSize='xs' color='blackAlpha.700'>
                Все права защищены,
                <br /> ученический файл,
                <br /> ©Клевер Технолоджи, 2025
            </Text>
            <Button
                fontSize='xs'
                leftIcon={<img src={ExitIcon} />}
                variant='ghost'
                aria-label='Выйти'
                size='xs'
            >
                Выйти
            </Button>
        </Stack>
    </Box>
);

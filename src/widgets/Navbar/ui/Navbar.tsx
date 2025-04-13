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
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';

import ExitIcon from '~/shared/assets/exit-icon.svg';
import { NavbarConfig } from '~/shared/config/tabTitles';

export const Navbar = ({ ...props }) => {
    const accordionRef = useRef<HTMLDivElement>(null);
    const [hasOverflow, setHasOverflow] = useState(false);

    useEffect(() => {
        if (!accordionRef.current) return;

        const observer = new ResizeObserver(() => {
            if (accordionRef.current) {
                const hasScroll =
                    accordionRef.current.scrollHeight > accordionRef.current.clientHeight ||
                    accordionRef.current.scrollWidth > accordionRef.current.clientWidth;
                setHasOverflow(hasScroll);
            }
        });

        observer.observe(accordionRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <Box
            width='260px'
            top='var(--header-height)'
            height='calc(100vh - var(--header-height))'
            paddingTop='24px'
            paddingRight='4px'
            boxShadow='0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)'
            display={{ base: 'none', lg: 'block' }}
            position='fixed'
            as='nav'
            {...props}
        >
            <Box
                paddingRight='4px'
                borderRadius='12px'
                paddingY='10px'
                boxShadow={
                    hasOverflow
                        ? '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        : ''
                }
            >
                <Accordion ref={accordionRef} variant='navbar' allowMultiple>
                    {Object.keys(NavbarConfig).map((tabName) => (
                        <AccordionItem key={tabName}>
                            <AccordionButton
                                as={Link}
                                to='/Vegan-cuisine/Main-courses'
                                _expanded={{ bg: 'lime.100', fontWeight: 'bold' }}
                                _hover={{ bg: 'lime.50' }}
                                data-test-id={
                                    tabName === 'Веганская кухня' ? 'vegan-cuisine' : null
                                }
                            >
                                <img src={NavbarConfig[tabName].icon} alt={tabName} />
                                <Text flex='1' textAlign='left'>
                                    {tabName}
                                </Text>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel>
                                <Tabs variant='navbar' colorScheme='lime' color='black'>
                                    <TabList>
                                        {NavbarConfig[tabName].tabsLinks.map(
                                            ({ tab, link }, index) => (
                                                <Tab
                                                    key={index}
                                                    _hover={{ bg: 'lime.50' }}
                                                    as={NavLink}
                                                    to={link}
                                                >
                                                    {tab}
                                                </Tab>
                                            ),
                                        )}
                                    </TabList>
                                </Tabs>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Box>

            <Stack
                height='var(--footer-left-height)'
                paddingX='24px'
                paddingBottom='32px'
                spacing={4}
                align='start'
                justifyContent='space-between'
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
};

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
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router';

import ExitIcon from '~/shared/assets/exit-icon.svg';
import { getCategores } from '~/shared/store/category/categorySlice';

export const Navbar = ({ ...props }) => {
    const accordionRef = useRef<HTMLDivElement>(null);
    const [hasOverflow, setHasOverflow] = useState(false);
    const categores = useSelector(getCategores);

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
            width='var(--navbar-width)'
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
                <Accordion ref={accordionRef} variant='navbar'>
                    {Object.keys(categores).map((categoryName) => (
                        <AccordionItem key={categoryName}>
                            <AccordionButton
                                as={Link}
                                to={`/${categoryName}/${categores[categoryName].subcategory[0].name}`}
                                _expanded={{ bg: 'lime.100', fontWeight: 'bold' }}
                                _hover={{ bg: 'lime.50' }}
                            >
                                <img src={categores[categoryName].icon} alt={categoryName} />
                                <Text flex='1' textAlign='left'>
                                    {categores[categoryName].label}
                                </Text>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel>
                                <Tabs variant='navbar' colorScheme='lime' color='black'>
                                    <TabList>
                                        {categores[categoryName].subcategory.map(
                                            ({ name, label }) => (
                                                <Tab
                                                    key={name}
                                                    _hover={{ bg: 'lime.50' }}
                                                    as={NavLink}
                                                    to={`/${categoryName}/${name}`}
                                                >
                                                    {label}
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

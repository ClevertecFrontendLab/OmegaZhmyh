import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Tab,
    TabList,
    Tabs,
    Text,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router';

import { selectAllCategories } from '~/entities/Category/';

import { useOverflow } from '../lib/useOverflow';

interface NavMenuProps {
    isMobile?: boolean;
}

export const NavMenu = (props: NavMenuProps) => {
    const { isMobile = false } = props;
    const categores = useSelector(selectAllCategories);

    const accordionRef = useRef<HTMLDivElement>(null);
    const hasOverflow = useOverflow(accordionRef);

    return (
        <Box
            paddingRight='4px'
            borderRadius='12px'
            paddingY='10px'
            flexGrow='1'
            minHeight='0'
            boxShadow={
                hasOverflow && !isMobile
                    ? '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    : ''
            }
        >
            <Accordion ref={accordionRef} variant='navbar' maxHeight='100%' allowToggle>
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
                                    {categores[categoryName].subcategory.map(({ name, label }) => (
                                        <Tab
                                            key={name}
                                            _hover={{ bg: 'lime.50' }}
                                            as={NavLink}
                                            to={`/${categoryName}/${name}`}
                                        >
                                            {label}
                                        </Tab>
                                    ))}
                                </TabList>
                            </Tabs>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
};

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Text,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

import { selectMainCategories } from '~/entities/Category/model/selectors';
import { API_BASE_IMG_URL } from '~/shared/config/constants';

import { useOverflow } from '../../lib/useOverflow';
import { SubcategoryList } from './SubcategoryList';

interface NavMenuProps {
    isMobile?: boolean;
}

export const NavMenu = (props: NavMenuProps) => {
    const { isMobile = false } = props;

    const mainCategories = useSelector(selectMainCategories);

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
            <Accordion ref={accordionRef} variant='navbar' maxHeight='100%' allowMultiple>
                {mainCategories.map((categoryInfo) => (
                    <AccordionItem key={categoryInfo.title}>
                        <AccordionButton
                            as={Link}
                            to={`/${categoryInfo.category}/${categoryInfo.subCategories[0].category}`}
                            _expanded={{ bg: 'lime.100', fontWeight: 'bold' }}
                            _hover={{ bg: 'lime.50' }}
                            data-test-id={categoryInfo.category == 'vegan' ? 'vegan-cuisine' : ''}
                        >
                            <img src={API_BASE_IMG_URL + categoryInfo.icon} />
                            <Text flex='1' textAlign='left'>
                                {categoryInfo.title}
                            </Text>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                            {!categoryInfo.subCategories ? null : (
                                <SubcategoryList
                                    key={categoryInfo.category}
                                    subcategores={categoryInfo.subCategories}
                                    categoryName={categoryInfo.category}
                                />
                            )}
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
};

import { Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { isBurgerOpen } from '../model/slice';
import { NavFooter } from './NavFooter';
import { NavMenu } from './NavMenu';

export const BurgerMenu = () => {
    const isOpen = useSelector(isBurgerOpen);
    return (
        <Flex
            flexDirection='column'
            justifyContent='space-between'
            width='var(--navbar-width)'
            top='var(--header-height)'
            right={isOpen ? '9px' : '-500px'}
            height='60%'
            paddingTop='24px'
            paddingRight='4px'
            boxShadow='0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)'
            bgColor='white'
            borderRadius='0 0 12px 12px'
            display={{ base: 'flex', lg: 'none' }}
            position='fixed'
            as='nav'
        >
            <NavMenu isMobile={true} />
            <NavFooter />
        </Flex>
    );
};

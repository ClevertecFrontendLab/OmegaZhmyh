import { Flex, useBreakpointValue } from '@chakra-ui/react';

import { NavFooter } from './NavFooter';
import { NavMenu } from './NavMenu/NavMenu';

export const NavBar = ({ ...props }) => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    return isMobile ? null : (
        <Flex
            width='var(--navbar-width)'
            top='var(--header-height)'
            flexDirection='column'
            height='calc(100vh - var(--header-height))'
            paddingTop='24px'
            paddingRight='4px'
            boxShadow='0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)'
            display={{ base: 'none', lg: 'flex' }}
            position='fixed'
            as='nav'
            data-test-id='nav'
            {...props}
        >
            <NavMenu />
            <NavFooter />
        </Flex>
    );
};

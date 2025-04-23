import { Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { AppBreadcrumb } from '~/shared/ui/AppBreadcrumb';

import { selectIsBurgerOpen } from '../model/selectors/selectIsBurgerOpen';
import { closeBurger } from '../model/slice';
import { NavFooter } from './NavFooter';
import { NavMenu } from './NavMenu';

export const BurgerMenu = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectIsBurgerOpen);
    const onCloseHandler = () => dispatch(closeBurger());
    return (
        <Drawer isOpen={isOpen} onClose={onCloseHandler} variant='burger'>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerBody bgColor='rgba(0, 0, 0, 0)'>
                    <Flex
                        flexDirection='column'
                        justifyContent='space-between'
                        width='344px'
                        top='var(--header-height)'
                        right='9px'
                        height='60%'
                        marginTop='var(--mobile-header-height)'
                        paddingTop='24px'
                        paddingRight='4px'
                        boxShadow='0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)'
                        bgColor='white'
                        borderRadius='0 0 12px 12px'
                        display={{ base: 'flex', lg: 'none' }}
                        as='nav'
                        data-test-id='nav'
                    >
                        <AppBreadcrumb />
                        <NavMenu isMobile={true} />
                        <NavFooter />
                    </Flex>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

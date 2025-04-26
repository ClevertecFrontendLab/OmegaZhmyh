import { Flex, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
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
        <Modal isOpen={isOpen} onClose={onCloseHandler} variant='burger'>
            <ModalOverlay />
            <ModalContent>
                <ModalBody bgColor='rgba(0, 0, 0, 0)'>
                    <Flex
                        flexDirection='column'
                        justifyContent='space-between'
                        width='344px'
                        right='9px'
                        height={{ base: '652px', md: '896px' }}
                        paddingTop='24px'
                        paddingRight='4px'
                        boxShadow='0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)'
                        bgColor='white'
                        borderRadius='0 0 12px 12px'
                        display={{ base: 'flex', lg: 'none' }}
                        as='nav'
                        data-test-id='nav'
                    >
                        <AppBreadcrumb isMobile={true} />
                        <NavMenu isMobile={true} />
                        <NavFooter />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

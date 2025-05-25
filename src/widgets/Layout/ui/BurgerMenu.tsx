import { Box, Flex, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { AppBreadcrumb } from '~/features/AppBreadcrumb';
import { MODAL_VARIANT } from '~/shared/config/chakra-variants.constants';

import { selectIsBurgerOpen } from '../model/slice';
import { closeBurger } from '../model/slice';
import { NavFooter } from './NavFooter';
import { NavMenu } from './NavMenu/NavMenu';

export const BurgerMenu = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectIsBurgerOpen);
    const onCloseHandler = () => dispatch(closeBurger());
    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseHandler}
            variant={MODAL_VARIANT}
            closeOnOverlayClick={true}
        >
            <ModalOverlay />
            <ModalContent transitionDuration='100ms'>
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
                        <Box paddingX='20px'>
                            <AppBreadcrumb isMobile={true} />
                        </Box>
                        <NavMenu isMobile={true} />
                        <NavFooter />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

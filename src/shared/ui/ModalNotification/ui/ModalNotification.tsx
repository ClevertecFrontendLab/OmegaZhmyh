import { Box, IconButton, Image, Modal, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';

import { BsXCircle } from '~/shared/ui/Icons';

type ModalNotificationProps = {
    isOpen: boolean;
    onClose: () => void;
    img: string;
    title: React.ReactNode;
    body: React.ReactNode;
    footer: React.ReactNode;
};

export const ModalNotification = ({
    isOpen,
    onClose,
    img,
    title,
    body,
    footer,
}: ModalNotificationProps) => {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                gap='32px'
                alignItems='stretch'
                p='32px'
                borderRadius='16px'
                maxW={{ base: '316px', lg: '396px' }}
            >
                <IconButton
                    aria-label='Закрыть'
                    icon={<BsXCircle boxSize='24px' />}
                    position='absolute'
                    top='24px'
                    right='24px'
                    size='xs'
                    variant='unstyled'
                    onClick={onClose}
                />

                <Image
                    src={img}
                    boxSize={{ base: '108px', lg: '206px' }}
                    mx='auto'
                    alt='email-code-verification'
                />
                <Box>
                    <Text textAlign='center' fontSize='2xl' fontWeight='bold'>
                        {title}
                    </Text>
                    <Text mt='16px' textAlign='center' color='blackAlpha.900'>
                        {body}
                    </Text>
                </Box>
                <Box color='blackAlpha.600' textAlign='center' fontSize='xs'>
                    {footer}
                </Box>
            </ModalContent>
        </Modal>
    );
};

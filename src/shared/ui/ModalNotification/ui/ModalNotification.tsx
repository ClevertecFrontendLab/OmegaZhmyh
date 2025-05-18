import { IconButton, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

import { BsXCircle } from '~/shared/ui/Icons';

type ModalNotificationProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    dataTestId?: string;
};

export const ModalNotification = ({
    isOpen,
    onClose,
    children,
    dataTestId,
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
                data-test-id={dataTestId}
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
                    data-test-id='close-button'
                />

                {children}
            </ModalContent>
        </Modal>
    );
};

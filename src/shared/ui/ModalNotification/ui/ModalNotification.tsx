import {
    Box,
    IconButton,
    Modal,
    ModalContent,
    ModalContentProps,
    ModalOverlay,
} from '@chakra-ui/react';

import { AUTH_MODAL_VARIANT } from '~/shared/config/chakra-variants.constants';
import { BsXCircle } from '~/shared/ui/Icons';

type ModalNotificationProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    dataTestId?: string;
} & ModalContentProps;

export const ModalNotification = ({
    isOpen,
    onClose,
    children,
    dataTestId,
    ...props
}: ModalNotificationProps) => {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} variant={AUTH_MODAL_VARIANT}>
            <ModalOverlay />
            <ModalContent data-test-id={dataTestId} {...props}>
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
                <Box>{children}</Box>
            </ModalContent>
        </Modal>
    );
};

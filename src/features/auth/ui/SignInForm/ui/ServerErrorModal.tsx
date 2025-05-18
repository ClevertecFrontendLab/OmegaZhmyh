import {
    Button,
    IconButton,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';

import { BsXCircle } from '~/shared/ui/Icons';

export const ServerErrorModal = ({
    isOpen,
    onClose,
    onRetry,
}: {
    isOpen: boolean;
    onClose: () => void;
    onRetry: () => void;
}) => (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
            p='32px'
            borderRadius='16px'
            maxW={{ base: '316px', lg: '396px' }}
            textAlign='center'
            data-test-id='sign-in-error-modal'
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
            <Image
                src='/src/shared/assets/Breakfast1.png'
                alt='breakfast'
                boxSize={{ base: '108px', lg: '206px' }}
                mx='auto'
            />
            <ModalHeader fontSize='2xl' fontWeight='bold' mt='32px' mb={0} p={0}>
                Вход не выполнен
            </ModalHeader>
            <ModalBody p={0} mt='16px'>
                <Text color='gray.600' fontSize='md'>
                    Что-то пошло не так.
                    <br />
                    Попробуйте еще раз
                </Text>
                <Button
                    mt='32px'
                    colorScheme='black'
                    bg='black'
                    color='white'
                    size='lg'
                    w='100%'
                    borderRadius='6px'
                    onClick={onRetry}
                    data-test-id='repeat-button'
                >
                    Повторить
                </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
);

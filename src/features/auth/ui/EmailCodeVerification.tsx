import {
    Button,
    IconButton,
    Image,
    Modal,
    ModalContent,
    ModalOverlay,
    PinInput,
    PinInputField,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';

import emailCodeVerification from '~/assets/images/email-code-verification.png';
import { BsXCircle } from '~/shared/ui/Icons';

export const EmailCodeVerification = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen}>Открыть модалку</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent gap='32px'>
                    <IconButton
                        aria-label='Закрыть'
                        icon={<BsXCircle />}
                        position='absolute'
                        top='24px'
                        right='24px'
                        variant='ghost'
                        onClick={onClose}
                    />
                    <Image src={emailCodeVerification} alt='email-code-verification' />
                    <VStack gap='24px'>
                        <VStack gap='16px'>
                            <Text>
                                Мы отправили вам на e-mail{' '}
                                <Text fontWeight='semibold'>ekaterinabaker@gmail.ru</Text>{' '}
                                шестизначный код. Введите его ниже.
                            </Text>
                            <PinInput>
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </VStack>
                        <Text>Не пришло письмо? Проверьте папку Спам.</Text>
                    </VStack>
                </ModalContent>
            </Modal>
        </>
    );
};

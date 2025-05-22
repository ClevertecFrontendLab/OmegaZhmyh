import { Button, Image, Text } from '@chakra-ui/react';

import breakfast from '~/shared/assets/Breakfast.png';
import { ModalNotification } from '~/shared/ui/ModalNotification';

export const ServerErrorModal = ({
    isOpen,
    onClose,
    onRetry,
}: {
    isOpen: boolean;
    onClose: () => void;
    onRetry: () => void;
}) => (
    <ModalNotification isOpen={isOpen} onClose={onClose} dataTestId='sign-in-error-modal'>
        <Image src={breakfast} alt='breakfast' boxSize={{ base: '108px', lg: '206px' }} mx='auto' />
        <Text textAlign='center' fontSize='2xl' fontWeight='bold' mt='32px'>
            Вход не выполнен
        </Text>
        <Text textAlign='center' color='gray.600' fontSize='md' mt='16px'>
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
    </ModalNotification>
);

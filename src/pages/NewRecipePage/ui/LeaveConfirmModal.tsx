import { Button, Center, Text, VStack } from '@chakra-ui/react';

import breakfastImg from '~/shared/assets/breakfast.png'; // используйте свою SVG/PNG
import { ModalNotification } from '~/shared/ui/ModalNotification';

type LeaveConfirmModalProps = {
    isOpen: boolean;
    onSave: () => void;
    onLeave: () => void;
    onClose: () => void;
};

export const LeaveConfirmModal = ({ isOpen, onSave, onLeave, onClose }: LeaveConfirmModalProps) => (
    <ModalNotification isOpen={isOpen} onClose={onClose}>
        <VStack p={6} minW='300px'>
            <Center>
                <img src={breakfastImg} alt='breakfast' style={{ width: 120, marginBottom: 16 }} />
            </Center>
            <Text fontWeight='bold' fontSize='xl' mb={2}>
                Выйти без сохранения?
            </Text>
            <Text color='gray.500' mb={4} textAlign='center'>
                Чтобы сохранить, нажмите кнопку сохранить черновик
            </Text>
            <Button w='100%' colorScheme='blackAlpha' onClick={onSave} leftIcon={<span>✏️</span>}>
                Сохранить черновик
            </Button>
            <Button variant='link' colorScheme='black' mt={2} onClick={onLeave}>
                Выйти без сохранения
            </Button>
        </VStack>
    </ModalNotification>
);

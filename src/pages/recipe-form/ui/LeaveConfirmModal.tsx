import { Button, Center, Text, VStack } from '@chakra-ui/react';
import { RefObject } from 'react';

import { CreateRecipe } from '~/entities/Recipe';
import breakfastImg from '~/shared/assets/breakfast.png';
import { BiEditAlt } from '~/shared/ui/icon';
import { ModalNotification } from '~/shared/ui/modal-notification';

import { useLeaveConfirm } from '../model/useLeaveConfirm';

type LeaveConfirmModalProps = {
    isNavigationAllowed: RefObject<boolean>;
    onDraftSave: (values: CreateRecipe) => Promise<void>;
};

export const LeaveConfirmModal = ({ isNavigationAllowed, onDraftSave }: LeaveConfirmModalProps) => {
    const { leaveModalOpen, handleLeave, handleClose, handleDraftSave } = useLeaveConfirm({
        isNavigationAllowed,
        onDraftSave,
    });

    return (
        <ModalNotification
            isOpen={leaveModalOpen}
            onClose={handleClose}
            dataTestId='recipe-preventive-modal'
        >
            <VStack>
                <Center>
                    <img
                        src={breakfastImg}
                        alt='breakfast'
                        style={{ width: 120, marginBottom: 16 }}
                    />
                </Center>
                <Text fontWeight='bold' fontSize='xl' mb={2}>
                    Выйти без сохранения?
                </Text>
                <Text color='gray.500' mb={4} textAlign='center'>
                    Чтобы сохранить, нажмите кнопку сохранить черновик
                </Text>
                <Button
                    w='100%'
                    bg='black'
                    color='white'
                    onClick={handleDraftSave}
                    leftIcon={<BiEditAlt />}
                >
                    Сохранить черновик
                </Button>
                <Button variant='link' colorScheme='black' mt={2} onClick={handleLeave}>
                    Выйти без сохранения
                </Button>
            </VStack>
        </ModalNotification>
    );
};

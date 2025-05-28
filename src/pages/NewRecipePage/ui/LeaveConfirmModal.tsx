import { Button, Center, Text, VStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router';

import { CreateRecipe } from '~/entities/Recipe';
import breakfastImg from '~/shared/assets/breakfast.png'; // используйте свою SVG/PNG
import { ModalNotification } from '~/shared/ui/ModalNotification';

type LeaveConfirmModalProps = {
    setIsDraftSave: (value: boolean) => void;
    isSuccess: boolean;
    setIsSuccess: (value: boolean) => void;
};

export const LeaveConfirmModal = ({ setIsDraftSave, setIsSuccess }: LeaveConfirmModalProps) => {
    const [leaveModalOpen, setLeaveModalOpen] = useState(false);
    const [blockerProceed, setBlockerProceed] = useState<null | (() => void)>(null);

    const { dirty, isSubmitting, handleSubmit } = useFormikContext<CreateRecipe>();

    const blocker = useBlocker(() => dirty && !isSubmitting);

    useEffect(() => {
        if (blocker.state === 'blocked') {
            setLeaveModalOpen(true);
            setBlockerProceed(() => blocker.proceed);
        }
    }, [blocker, blocker.state]);

    const handleLeave = () => {
        handleClose();
        if (blockerProceed) blockerProceed();
    };

    const handleClose = () => {
        setLeaveModalOpen(false);
        setIsSuccess(false);
    };

    const handleSaveDraft = () => {
        setIsDraftSave(true);
        handleSubmit();
        handleClose();
    };

    return (
        <ModalNotification
            isOpen={leaveModalOpen}
            onClose={handleClose}
            dataTestId='recipe-preventive-modal'
        >
            <VStack p={6} minW='300px'>
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
                    colorScheme='blackAlpha'
                    onClick={handleSaveDraft}
                    leftIcon={<span>✏️</span>}
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

import { Button, Center, Text, VStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { RefObject, useEffect, useState } from 'react';
import { useBlocker } from 'react-router';
import * as Yup from 'yup';

import { CreateRecipe } from '~/entities/Recipe';
import breakfastImg from '~/shared/assets/breakfast.png';
import { BiEditAlt } from '~/shared/ui/Icons';
import { ModalNotification } from '~/shared/ui/ModalNotification';
import { handleValidationErrors } from '~/shared/utils/handleValidationErrors';

import { draftSchema } from '../model/validationSchema';

type LeaveConfirmModalProps = {
    isSuccess: RefObject<boolean>;
    onDraftSave: (values: CreateRecipe) => Promise<void>;
};

export const LeaveConfirmModal = ({ isSuccess, onDraftSave }: LeaveConfirmModalProps) => {
    const [leaveModalOpen, setLeaveModalOpen] = useState(false);
    const [blockerProceed, setBlockerProceed] = useState<null | (() => void)>(null);

    const { dirty, values, setErrors, resetForm } = useFormikContext<CreateRecipe>();

    const blocker = useBlocker(() => dirty && !isSuccess.current);

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
        isSuccess.current = false;
    };

    const handleDraftSave = async () => {
        try {
            await draftSchema.validate(values, { abortEarly: false });
            await onDraftSave(values);
            resetForm();
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                setErrors(handleValidationErrors(err));
            }
        } finally {
            handleClose();
        }
    };

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

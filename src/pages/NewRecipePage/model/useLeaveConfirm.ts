import { useFormikContext } from 'formik';
import { RefObject, useEffect, useState } from 'react';
import { useBlocker } from 'react-router';

import { CreateRecipe } from '~/entities/Recipe';

import { useValidation } from '../lib/useValidation';
import { draftSchema } from './validationSchema';

type UseLeaveConfirmProps = {
    isSuccess: RefObject<boolean>;
    onDraftSave: (values: CreateRecipe) => Promise<void>;
};

export const useLeaveConfirm = ({ isSuccess, onDraftSave }: UseLeaveConfirmProps) => {
    const [leaveModalOpen, setLeaveModalOpen] = useState(false);
    const [blockerProceed, setBlockerProceed] = useState<null | (() => void)>(null);

    const { dirty, resetForm } = useFormikContext<CreateRecipe>();
    const { validateAndExecute } = useValidation();

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
        await validateAndExecute(draftSchema, async (values) => {
            await onDraftSave(values);
            resetForm();
        });
        handleClose();
    };

    return {
        leaveModalOpen,
        handleLeave,
        handleClose,
        handleDraftSave,
    };
};

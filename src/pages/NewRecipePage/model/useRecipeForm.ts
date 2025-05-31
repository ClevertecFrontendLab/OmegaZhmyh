import { CreateRecipe } from '~/entities/Recipe';

import { useValidation } from '../lib/useValidation';
import { draftSchema, requiredSchema } from './validationSchema';

type UseRecipeFormProps = {
    onDraftSave: (values: CreateRecipe) => Promise<void>;
    onSave: (values: CreateRecipe) => Promise<void>;
    isEdit: boolean;
    handleUpdateRecipe: (values: CreateRecipe) => Promise<void>;
};

export const useRecipeForm = ({
    onDraftSave,
    onSave,
    isEdit,
    handleUpdateRecipe,
}: UseRecipeFormProps) => {
    const { validateAndExecute } = useValidation();

    const handleDraftSave = () => validateAndExecute(draftSchema, onDraftSave);
    const handlePublish = () => validateAndExecute(requiredSchema, onSave);
    const handleUpdate = () => validateAndExecute(requiredSchema, handleUpdateRecipe);

    return {
        handleDraftSave,
        handlePublish,
        handleUpdate,
        isEdit,
    };
};

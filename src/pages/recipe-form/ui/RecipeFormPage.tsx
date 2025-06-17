import { Formik } from 'formik';
import { useRef } from 'react';

import { CreateRecipe } from '~/entities/recipe';

import { useDraftSaving } from '../model/useDraftSaving';
import { useDraftUpdating } from '../model/useDraftUpdating';
import { useRecipeSaving } from '../model/useRecipeSaving';
import { useRecipeUpdating } from '../model/useRecipeUpdating';
import { RecipeForm } from './components/RecipeForm';
import { LeaveConfirmModal } from './LeaveConfirmModal';

const initialNewRecipeValues: Partial<CreateRecipe> = {
    steps: [{ stepNumber: 1, description: '' }],
    ingredients: [{ title: '', measureUnit: '' }],
    title: '',
    description: '',
    categoriesIds: [],
    image: '',
};

type RecipeProps = {
    isEdit?: boolean;
    isDraft?: boolean;
};

export const RecipeFormPage = ({ isEdit = false, isDraft = false }: RecipeProps) => {
    const isNavigationAllowed = useRef(false);
    const { saveRecipe } = useRecipeSaving(isNavigationAllowed);
    const { updateRecipe, initialRecipeValues } = useRecipeUpdating(isNavigationAllowed);

    const { saveDraft } = useDraftSaving(isNavigationAllowed);
    const { updateDraft, initialDraftValues } = useDraftUpdating(isNavigationAllowed);

    let initialValues = initialNewRecipeValues;
    if (isEdit && isDraft) {
        initialValues = initialDraftValues || initialNewRecipeValues;
    } else if (isEdit && !isDraft) {
        initialValues = initialRecipeValues || initialNewRecipeValues;
    }

    return (
        <Formik
            initialValues={initialValues}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={() => {}}
        >
            <>
                <LeaveConfirmModal
                    isNavigationAllowed={isNavigationAllowed}
                    onDraftSave={saveDraft}
                />
                <RecipeForm
                    onDraftSave={isEdit ? updateDraft : saveDraft}
                    onSave={saveRecipe}
                    isEdit={isEdit}
                    handleUpdateRecipe={updateRecipe}
                />
            </>
        </Formik>
    );
};

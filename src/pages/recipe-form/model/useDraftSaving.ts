import { RefObject } from 'react';
import { useNavigate } from 'react-router';

import { CreateRecipe, useCreateRecipeDraftMutation } from '~/entities/recipe';
import { isErrorResponse, SUCCESS_STATUS } from '~/features/auth';
import { HTTP_STATUS, ROUTES, SERVER_ERROR_MESSAGES } from '~/shared/config';
import { useErrorAlert } from '~/shared/ui/alert';

import { deepClean } from '../lib/deepClean';
import { RECIPE_MESSAGES } from '../ui/recipe-form.constants';

export const useDraftSaving = (isNavigationAllowed: RefObject<boolean>) => {
    const navigate = useNavigate();

    const [createRecipeDraft] = useCreateRecipeDraftMutation();

    const { handleError } = useErrorAlert();

    const saveDraft = async (values: CreateRecipe) => {
        const cleanedValues = deepClean(values);

        try {
            await createRecipeDraft(cleanedValues).unwrap();
            handleError({
                errorTitle: RECIPE_MESSAGES.DRAFT.SUCCESS,
                status: SUCCESS_STATUS,
            });

            isNavigationAllowed.current = true;
            navigate(ROUTES.HOME);
        } catch (error) {
            if (isErrorResponse(error)) {
                if (error.status === HTTP_STATUS.CONFLICT) {
                    handleError({
                        errorTitle: SERVER_ERROR_MESSAGES.ERROR,
                        errorMessage: RECIPE_MESSAGES.RECIPE.DUPLICATE_ENTITY,
                    });
                } else if (error.status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
                    handleError({
                        errorTitle: SERVER_ERROR_MESSAGES.SERVER_ERROR,
                        errorMessage: RECIPE_MESSAGES.DRAFT.SAVE_ERROR,
                    });
                }
            }
        } finally {
            isNavigationAllowed.current = false;
        }
    };

    return { saveDraft };
};

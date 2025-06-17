import { RefObject } from 'react';
import { useNavigate, useParams } from 'react-router';

import { CreateRecipe } from '~/entities/recipe';
import { useUpdateRecipeDraftMutation } from '~/entities/recipe/api/recipeApi';
import { useGetUserQuery } from '~/entities/user';
import { isErrorResponse, SUCCESS_STATUS } from '~/features/auth';
import { HTTP_STATUS, ROUTES, SERVER_ERROR_MESSAGES } from '~/shared/config';
import { useErrorAlert } from '~/shared/ui/alert';

import { RECIPE_MESSAGES } from '../ui/recipe-form.constants';

export const useDraftUpdating = (isNavigationAllowed: RefObject<boolean>) => {
    const navigate = useNavigate();
    const { draftId } = useParams();

    const [updateRecipeDraft] = useUpdateRecipeDraftMutation();
    const { data: userInfo } = useGetUserQuery();
    const initialDraftValues = userInfo?.drafts.find((draft) => draft._id === draftId);

    const { handleError } = useErrorAlert();

    const updateDraft = async (values: CreateRecipe) => {
        if (!initialDraftValues) return;

        try {
            await updateRecipeDraft({ recipe: values, id: initialDraftValues._id }).unwrap();
            handleError({
                errorTitle: RECIPE_MESSAGES.RECIPE.SUCCESS,
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
                        errorMessage: RECIPE_MESSAGES.RECIPE.SAVE_ERROR,
                    });
                }
            }
        } finally {
            isNavigationAllowed.current = false;
        }
    };

    return { updateDraft, initialDraftValues };
};

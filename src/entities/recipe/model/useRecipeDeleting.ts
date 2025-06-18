import { useNavigate } from 'react-router';

import { isErrorResponse } from '~/features/auth';
import { RECIPE_ERROR_MESSAGES } from '~/pages/recipe/ui/recipe-messages.constants';
import { HTTP_STATUS, ROUTES, SERVER_ERROR_MESSAGES } from '~/shared/config';
import { useErrorAlert } from '~/shared/ui/alert';

import { useDeleteRecipeMutation } from '../api/recipeApi';

export const useRecipeDeleting = ({ id }: { id?: string }) => {
    const { handleError } = useErrorAlert();
    const navigate = useNavigate();

    const [deleteRecipe] = useDeleteRecipeMutation();

    const handleDeleteRecipe = async () => {
        if (id) {
            try {
                await deleteRecipe(id).unwrap();
                handleError({
                    errorTitle: RECIPE_ERROR_MESSAGES.RECIPE_DELETE_SUCCESS,
                    status: 'success',
                });
                navigate(ROUTES.HOME);
            } catch (error) {
                if (isErrorResponse(error)) {
                    if (error.status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
                        handleError({
                            errorTitle: SERVER_ERROR_MESSAGES.SERVER_ERROR,
                            errorMessage: RECIPE_ERROR_MESSAGES.RECIPE_DELETE_ERROR,
                        });
                    }
                }
            }
        }
    };
    return { handleDeleteRecipe };
};

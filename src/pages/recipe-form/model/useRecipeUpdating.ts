import { RefObject } from 'react';
import { useNavigate, useParams } from 'react-router';

import { CreateRecipe, useGetRecipeByIdQuery, useUpdateRecipeMutation } from '~/entities/recipe';
import { isErrorResponse, SUCCESS_STATUS } from '~/features/auth';
import { HTTP_STATUS, SERVER_ERROR_MESSAGES } from '~/shared/config';
import { useErrorAlert } from '~/shared/ui/alert';

import { RECIPE_MESSAGES } from '../ui/recipe-form.constants';

export const useRecipeUpdating = (isNavigationAllowed: RefObject<boolean>) => {
    const navigate = useNavigate();
    const [updateRecipeMutation] = useUpdateRecipeMutation();

    const { id, category, subcategory } = useParams();
    const { data: initialRecipeValues } = useGetRecipeByIdQuery(id as string, { skip: !id });

    const { handleError } = useErrorAlert();

    const updateRecipe = async (values: CreateRecipe) => {
        if (!initialRecipeValues) return;

        try {
            await updateRecipeMutation({ recipe: values, id: initialRecipeValues._id }).unwrap();
            handleError({
                errorTitle: RECIPE_MESSAGES.RECIPE.SUCCESS,
                status: SUCCESS_STATUS,
            });

            isNavigationAllowed.current = true;
            navigate(`/${category as string}/${subcategory as string}/${initialRecipeValues._id}`);
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

    return { updateRecipe, initialRecipeValues };
};

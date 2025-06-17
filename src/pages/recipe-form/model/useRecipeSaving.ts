import { RefObject } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { selectMainCategories, selectSubCategories } from '~/entities/category';
import { CreateRecipe, useCreateRecipeMutation } from '~/entities/recipe';
import { isErrorResponse, SUCCESS_STATUS } from '~/features/auth';
import { HTTP_STATUS, SERVER_ERROR_MESSAGES } from '~/shared/config';
import { useErrorAlert } from '~/shared/ui/alert';

import { RECIPE_MESSAGES } from '../ui/recipe-form.constants';

export const useRecipeSaving = (isNavigationAllowed: RefObject<boolean>) => {
    const navigate = useNavigate();

    const [createRecipeMutation] = useCreateRecipeMutation();

    const mainCategories = useSelector(selectMainCategories);
    const subCategories = useSelector(selectSubCategories);

    const { handleError } = useErrorAlert();

    const saveRecipe = async (values: CreateRecipe) => {
        try {
            const { _id, categoriesIds } = await createRecipeMutation(values).unwrap();
            handleError({
                errorTitle: RECIPE_MESSAGES.RECIPE.SUCCESS,
                status: SUCCESS_STATUS,
            });

            const subCategory = subCategories.find((sub) => sub._id === categoriesIds?.[0]);
            const mainCategory = mainCategories.find(
                (cat) => cat._id === subCategory?.rootCategoryId,
            );

            isNavigationAllowed.current = true;
            navigate(`/${mainCategory?.category}/${subCategory?.category}/${_id}`);
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

    return { saveRecipe };
};

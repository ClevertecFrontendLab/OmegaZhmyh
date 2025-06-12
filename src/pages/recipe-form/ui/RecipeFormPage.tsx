import { Formik } from 'formik';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { selectMainCategories, selectSubCategories } from '~/entities/category';
import { CreateRecipe } from '~/entities/recipe';
import {
    useCreateRecipeDraftMutation,
    useCreateRecipeMutation,
    useGetRecipeByIdQuery,
    useUpdateRecipeMutation,
} from '~/entities/recipe/';
import { isErrorResponse } from '~/features/auth/';
import { SUCCESS_STATUS } from '~/features/auth/';
import { HTTP_STATUS, ROUTES, SERVER_ERROR_MESSAGES } from '~/shared/config';
import { useErrorAlert } from '~/shared/ui/alert';

import { deepClean } from '../lib/deepClean';
import { RecipeForm } from './components/RecipeForm';
import { LeaveConfirmModal } from './LeaveConfirmModal';
import { RECIPE_MESSAGES } from './recipe-form.constants';

const initialValues: Partial<CreateRecipe> = {
    steps: [{ stepNumber: 1, description: '' }],
    ingredients: [{ title: '', measureUnit: '' }],
    title: '',
    description: '',
    categoriesIds: [],
    image: '',
};

export const RecipeFormPage = ({ isEdit = false }: { isEdit?: boolean }) => {
    const navigate = useNavigate();

    const [createRecipe] = useCreateRecipeMutation();
    const [createRecipeDraft] = useCreateRecipeDraftMutation();
    const { id, category, subcategory } = useParams();
    const { data: recipe } = useGetRecipeByIdQuery(id as string, { skip: !id });
    const [updateRecipe] = useUpdateRecipeMutation();

    const { handleError } = useErrorAlert();
    const mainCategories = useSelector(selectMainCategories);
    const subCategories = useSelector(selectSubCategories);

    const isNavigationAllowed = useRef(false);

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

    const saveRecipe = async (values: CreateRecipe) => {
        try {
            const { _id, categoriesIds } = await createRecipe(values).unwrap();
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

    const handleUpdateRecipe = async (values: CreateRecipe) => {
        if (!recipe) return;

        try {
            await updateRecipe({ recipe: values, id: recipe._id }).unwrap();
            handleError({
                errorTitle: RECIPE_MESSAGES.RECIPE.SUCCESS,
                status: SUCCESS_STATUS,
            });

            isNavigationAllowed.current = true;
            navigate(`/${category as string}/${subcategory as string}/${recipe._id}`);
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

    return (
        <Formik
            initialValues={isEdit && recipe ? recipe : initialValues}
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
                    onDraftSave={saveDraft}
                    onSave={saveRecipe}
                    isEdit={isEdit}
                    handleUpdateRecipe={handleUpdateRecipe}
                />
            </>
        </Formik>
    );
};

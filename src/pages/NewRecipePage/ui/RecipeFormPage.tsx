import { Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { selectMainCategories, selectSubCategories } from '~/entities/Category';
import { CreateRecipe } from '~/entities/Recipe';
import {
    useCreateRecipeDraftMutation,
    useCreateRecipeMutation,
} from '~/entities/Recipe/api/recipeApi';
import { isErrorResponse } from '~/features/auth/types/auth.types';
import { useErrorAlert } from '~/shared/ui/SnackbarAlert';

import { deepClean } from '../lib/deepClean';
import { getRecipeValidationSchema } from '../model/validationSchema';
import { LeaveConfirmModal } from './LeaveConfirmModal';
import { RecipeForm } from './RecipeForm';

const initialValues: CreateRecipe = {
    title: undefined,
    description: undefined,
    time: undefined,
    image: undefined,
    categoriesIds: undefined,
    steps: [{ stepNumber: 1, description: '' }],
    ingredients: [{ title: '', count: undefined, measureUnit: '' }],
    meat: undefined,
    garnish: undefined,
    portions: undefined,
};

export const RecipeFormPage = () => {
    const navigate = useNavigate();

    const [createRecipe] = useCreateRecipeMutation();
    const [createRecipeDraft] = useCreateRecipeDraftMutation();

    const { handleError } = useErrorAlert();
    const mainCategories = useSelector(selectMainCategories);
    const subCategories = useSelector(selectSubCategories);

    const [isSuccess, setIsSuccess] = useState(false);
    const [isDraftSave, setIsDraftSave] = useState(true);

    const saveDraft = async (values: CreateRecipe) => {
        const cleanedValues = deepClean(values);

        try {
            await createRecipeDraft(cleanedValues).unwrap();
            handleError({
                errorTitle: 'Черновик успешно сохранен',
                status: 'success',
            });
            navigate('/');
        } catch (error) {
            if (isErrorResponse(error)) {
                if (error.status === 409) {
                    handleError({
                        errorTitle: 'Ошибка',
                        errorMessage: 'Рецепт с таким названием уже существует',
                    });
                } else if (error.status === 500) {
                    handleError({
                        errorTitle: 'Ошибка сервера',
                        errorMessage: 'Не удалось сохранить черновик рецепта',
                    });
                }
            }
        }
    };

    const saveRecipe = async (
        values: CreateRecipe,
        { setSubmitting, resetForm }: FormikHelpers<CreateRecipe>,
    ) => {
        try {
            const { _id, categoriesIds } = await createRecipe(values).unwrap();
            setIsSuccess(true);
            handleError({
                errorTitle: 'Рецепт успешно опубликован',
                status: 'success',
            });
            resetForm();

            const subCategory = subCategories.find((sub) => sub._id === categoriesIds?.[0]);
            const mainCategory = mainCategories.find(
                (cat) => cat._id === subCategory?.rootCategoryId,
            );

            navigate(`/${mainCategory?.category}/${subCategory?.category}/${_id}`);
        } catch (error) {
            if (isErrorResponse(error)) {
                if (error.status === 409) {
                    handleError({
                        errorTitle: 'Ошибка',
                        errorMessage: 'Рецепт с таким названием уже существует',
                    });
                } else if (error.status === 500) {
                    handleError({
                        errorTitle: 'Ошибка сервера',
                        errorMessage: 'Попробуйте пока сохранить в черновик',
                    });
                }
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmit = async (values: CreateRecipe, helpers: FormikHelpers<CreateRecipe>) => {
        if (isDraftSave) {
            await saveDraft(values);
        } else {
            await saveRecipe(values, helpers);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={getRecipeValidationSchema(isDraftSave)}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={handleSubmit}
        >
            <>
                <LeaveConfirmModal
                    setIsDraftSave={setIsDraftSave}
                    isSuccess={isSuccess}
                    setIsSuccess={setIsSuccess}
                />
                <RecipeForm setIsDraftSave={setIsDraftSave} />
            </>
        </Formik>
    );
};

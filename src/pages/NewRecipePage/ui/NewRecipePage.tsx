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
    title: '',
    description: '',
    time: 0,
    image: '',
    categoriesIds: [],
    steps: [{ stepNumber: 1, description: '' }],
    ingredients: [{ title: '', count: 1, measureUnit: '' }],
    meat: undefined,
    garnish: undefined,
    portions: 1,
};

export const NewRecipePage = () => {
    const navigate = useNavigate();

    const [createRecipe] = useCreateRecipeMutation();
    const [createRecipeDraft] = useCreateRecipeDraftMutation();
    const { handleError } = useErrorAlert();
    const mainCategories = useSelector(selectMainCategories);
    const subCategories = useSelector(selectSubCategories);

    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (
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

            const subCategory = subCategories.find((sub) => sub._id === categoriesIds[0]);
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

    const handleSaveDraft = async (values: CreateRecipe) => {
        const cleanedValues = deepClean(values);
        const shema = getRecipeValidationSchema(true);
        try {
            await shema.validate(cleanedValues);
        } catch (error) {
            console.error(error);
        }

        try {
            await createRecipeDraft(cleanedValues).unwrap();
            handleError({
                errorTitle: 'Черновик успешно сохранён',
                status: 'success',
            });
            navigate('/');
        } catch (_error) {
            handleError({
                errorTitle: 'Ошибка',
                errorMessage: 'Не удалось сохранить черновик',
            });
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={getRecipeValidationSchema(false)}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={handleSubmit}
        >
            {({ values }) => (
                <>
                    <LeaveConfirmModal
                        onDraftSave={() => handleSaveDraft(values)}
                        isSuccess={isSuccess}
                    />
                    <RecipeForm onDraftSave={() => handleSaveDraft(values)} />
                </>
            )}
        </Formik>
    );
};

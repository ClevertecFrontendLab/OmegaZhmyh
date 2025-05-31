import { Formik } from 'formik';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { selectMainCategories, selectSubCategories } from '~/entities/Category';
import { CreateRecipe } from '~/entities/Recipe';
import {
    useCreateRecipeDraftMutation,
    useCreateRecipeMutation,
    useGetRecipeByIdQuery,
    useUpdateRecipeMutation,
} from '~/entities/Recipe/api/recipeApi';
import { isErrorResponse } from '~/features/auth/types/auth.types';
import { useErrorAlert } from '~/shared/ui/SnackbarAlert';

import { deepClean } from '../lib/deepClean';
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

export const RecipeFormPage = ({ isEdit = false }: { isEdit?: boolean }) => {
    const navigate = useNavigate();

    const [createRecipe] = useCreateRecipeMutation();
    const [createRecipeDraft] = useCreateRecipeDraftMutation();
    const { id, category, subcategory } = useParams();
    const { data: recipe } = useGetRecipeByIdQuery(id as string);
    const [updateRecipe] = useUpdateRecipeMutation();

    const { handleError } = useErrorAlert();
    const mainCategories = useSelector(selectMainCategories);
    const subCategories = useSelector(selectSubCategories);

    const isSuccess = useRef(false);

    const saveDraft = async (values: CreateRecipe) => {
        const cleanedValues = deepClean(values);

        try {
            await createRecipeDraft(cleanedValues).unwrap();
            handleError({
                errorTitle: 'Черновик успешно сохранен',
                status: 'success',
            });
            isSuccess.current = true;
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
        } finally {
            isSuccess.current = false;
        }
    };

    const saveRecipe = async (values: CreateRecipe) => {
        try {
            const { _id, categoriesIds } = await createRecipe(values).unwrap();
            isSuccess.current = true;
            handleError({
                errorTitle: 'Рецепт успешно опубликован',
                status: 'success',
            });

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
            isSuccess.current = false;
        }
    };

    const handleUpdateRecipe = async (values: CreateRecipe) => {
        if (!recipe) return;

        try {
            await updateRecipe({ recipe: values, id: recipe._id }).unwrap();
            handleError({
                errorTitle: 'Рецепт успешно опубликован',
                status: 'success',
            });
            navigate(`/${category as string}/${subcategory as string}/${recipe._id}`);
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
            isSuccess.current = false;
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
                <LeaveConfirmModal isSuccess={isSuccess} onDraftSave={saveDraft} />
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

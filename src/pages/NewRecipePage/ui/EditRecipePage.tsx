import { Formik, FormikHelpers } from 'formik';
import { useNavigate, useParams } from 'react-router';

import { CreateRecipe } from '~/entities/Recipe';
import { useGetRecipeByIdQuery, useUpdateRecipeMutation } from '~/entities/Recipe/api/recipeApi';
import { isErrorResponse } from '~/features/auth/types/auth.types';
import { getRecipeValidationSchema } from '~/pages/NewRecipePage/model/validationSchema';
import { RecipeForm } from '~/pages/NewRecipePage/ui/RecipeForm';
import { useErrorAlert } from '~/shared/ui/SnackbarAlert';

export const EditRecipePage = () => {
    const navigate = useNavigate();
    const { id, category, subcategory } = useParams();
    const { data: recipe } = useGetRecipeByIdQuery(id as string);
    const [updateRecipe] = useUpdateRecipeMutation();
    const { handleError } = useErrorAlert();

    if (!recipe) return <div>Рецепт не найден</div>;

    const handleSubmit = async (values: CreateRecipe, helpers: FormikHelpers<CreateRecipe>) => {
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
            helpers.setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={
                {
                    title: recipe.title,
                    description: recipe.description,
                    time: recipe.time,
                    categoriesIds: recipe.categoriesIds,
                    meat: recipe.meat,
                    garnish: recipe.garnish,
                    portions: recipe.portions,
                    image: recipe.image,
                    steps: recipe.steps,
                    ingredients: recipe.ingredients,
                } as CreateRecipe
            }
            validationSchema={getRecipeValidationSchema(false)}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={handleSubmit}
        >
            <RecipeForm setIsDraftSave={() => {}} />
        </Formik>
    );
};

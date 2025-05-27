import { Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router';

import { CreateRecipe } from '~/entities/Recipe';
import { useCreateRecipeMutation } from '~/entities/Recipe/api/recipeApi';
import { isErrorResponse } from '~/features/auth/types/auth.types';
import { useErrorAlert } from '~/shared/ui/SnackbarAlert';

import { validationSchema } from '../model/validationSchema';
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

    const [createRecipe, { isSuccess }] = useCreateRecipeMutation();
    const { handleError } = useErrorAlert();

    const handleSubmit = async (
        values: CreateRecipe,
        { setSubmitting, resetForm }: FormikHelpers<CreateRecipe>,
    ) => {
        try {
            await createRecipe(values).unwrap();
            handleError({
                errorTitle: 'Рецепт успешно опубликован',
                status: 'success',
            });
            resetForm();
            navigate('/recipes');
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

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={handleSubmit}
        >
            <>
                <LeaveConfirmModal onSave={() => {}} isSuccess={isSuccess} />
                <RecipeForm />
            </>
        </Formik>
    );
};

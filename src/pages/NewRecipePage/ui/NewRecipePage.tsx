import { Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router';

import { CreateRecipe } from '~/entities/Recipe';
import { useCreateRecipeMutation } from '~/entities/Recipe/api/recipeApi';

import { validationSchema } from '../model/validationSchema';
import { RecipeForm } from './RecipeForm';

const initialValues: CreateRecipe = {
    title: '',
    description: '',
    time: '0',
    image: undefined,
    categoriesIds: [],
    steps: [],
    ingredients: [],
    meat: undefined,
    garnish: undefined,
    portions: 1,
};

export const NewRecipePage = () => {
    const navigate = useNavigate();

    const [createRecipe] = useCreateRecipeMutation();

    const handleSubmit = async (
        values: CreateRecipe,
        { setSubmitting }: FormikHelpers<CreateRecipe>,
    ) => {
        try {
            await createRecipe(values).unwrap();
            navigate('/recipes');
        } catch (error) {
            console.error('Failed to create recipe:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <RecipeForm />
        </Formik>
    );
};

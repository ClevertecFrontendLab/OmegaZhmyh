import { useFormikContext } from 'formik';
import * as Yup from 'yup';

import { CreateRecipe } from '~/entities/recipe';
import { handleValidationErrors } from '~/shared/lib';

import { ValidationSchema } from '../model/validationSchema';

export const useValidation = () => {
    const { values, setErrors } = useFormikContext<CreateRecipe>();

    const validateAndExecute = async (
        schema: ValidationSchema,
        action: (values: CreateRecipe) => Promise<void>,
    ) => {
        try {
            await schema.validate(values, { abortEarly: false });
            await action(values);
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                setErrors(handleValidationErrors(err));
            }
        }
    };

    return {
        validateAndExecute,
    };
};

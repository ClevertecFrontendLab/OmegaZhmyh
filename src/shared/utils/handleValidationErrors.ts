import * as Yup from 'yup';

export type ValidationErrors = {
    [key: string]: string | ValidationErrors[] | { [key: string]: string };
};

export const handleValidationErrors = (error: Yup.ValidationError): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    error.inner.forEach((error) => {
        const path = error.path;
        if (!path) return;

        if (path.includes('[')) {
            const match = path.match(/(\w+)\[(\d+)\]\.?(\w+)?/);
            if (!match) return;

            const [, fieldName, index, nestedField] = match;
            if (!fieldName || !index) return;

            if (!newErrors[fieldName]) {
                newErrors[fieldName] = [];
            }

            const fieldErrors = newErrors[fieldName] as ValidationErrors[];
            if (!fieldErrors[Number(index)]) {
                fieldErrors[Number(index)] = {};
            }

            if (nestedField) {
                (fieldErrors[Number(index)] as { [key: string]: string })[nestedField] =
                    error.message;
            }
        } else {
            newErrors[path] = error.message;
        }
    });

    return newErrors;
};

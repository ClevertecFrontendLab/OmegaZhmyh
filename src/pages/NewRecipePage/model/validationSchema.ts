import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
    time: Yup.string().required(),
    categoriesIds: Yup.array().of(Yup.string()).min(3).required(),
    portions: Yup.number().min(1).required(),
    image: Yup.string(),
    steps: Yup.array()
        .of(
            Yup.object().shape({
                stepNumber: Yup.number().required(),
                description: Yup.string().required(),
                image: Yup.string().required(),
            }),
        )
        .min(1)
        .required(),
    ingredients: Yup.array()
        .of(
            Yup.object().shape({
                title: Yup.string().required(),
                count: Yup.number().min(0.1).required(),
                measureUnit: Yup.string().required(),
            }),
        )
        .min(1)
        .required(),
    meat: Yup.string(),
    garnish: Yup.string(),
});

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    title: Yup.string().max(50).required(),
    description: Yup.string().max(500).required(),
    time: Yup.number().positive().max(10000).required(),
    categoriesIds: Yup.array().of(Yup.string()).min(3).required(),
    portions: Yup.number().min(1).required(),
    image: Yup.string().required(),
    steps: Yup.array()
        .of(
            Yup.object().shape({
                stepNumber: Yup.number().required(),
                description: Yup.string().max(300).required(),
                image: Yup.string().optional().nullable(),
            }),
        )
        .min(1)
        .required(),
    ingredients: Yup.array()
        .of(
            Yup.object().shape({
                title: Yup.string().max(50).required(),
                count: Yup.number().positive().required(),
                measureUnit: Yup.string().required(),
            }),
        )
        .min(1)
        .required(),
    meat: Yup.string(),
    garnish: Yup.string(),
});

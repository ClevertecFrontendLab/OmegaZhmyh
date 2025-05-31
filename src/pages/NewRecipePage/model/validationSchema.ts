import * as Yup from 'yup';

export const draftSchema = Yup.object().shape({
    title: Yup.string().max(50).required(),
    description: Yup.string().max(500),
    categoriesIds: Yup.array().of(Yup.string()).min(3),
    time: Yup.number().positive().max(10000),
    portions: Yup.number().min(1),
    ingredients: Yup.array()
        .of(
            Yup.object().shape({
                title: Yup.string().max(50),
                count: Yup.number().positive(),
                measureUnit: Yup.string(),
            }),
        )
        .min(1),
    steps: Yup.array()
        .of(
            Yup.object().shape({
                stepNumber: Yup.number(),
                description: Yup.string().max(300),
                image: Yup.string().nullable(),
            }),
        )
        .min(1),
    meat: Yup.string(),
    garnish: Yup.string(),
});

export const requiredSchema = Yup.object().shape({
    title: Yup.string().max(50).required(),
    description: Yup.string().max(500).required(),
    categoriesIds: Yup.array().of(Yup.string()).min(3).required(),
    time: Yup.number().positive().max(10000).required(),
    portions: Yup.number().min(1).required(),
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
    steps: Yup.array()
        .of(
            Yup.object().shape({
                stepNumber: Yup.number().required(),
                description: Yup.string().max(300).required(),
                image: Yup.string().nullable(),
            }),
        )
        .min(1)
        .required(),
    meat: Yup.string(),
    garnish: Yup.string(),
});

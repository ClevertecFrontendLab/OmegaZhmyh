import * as Yup from 'yup';

export const getRecipeValidationSchema = (isDraft: boolean) =>
    Yup.object().shape({
        title: Yup.string().max(50).required(),
        description: isDraft ? Yup.string().max(500) : Yup.string().max(500).required(),
        time: isDraft
            ? Yup.number().positive().max(10000)
            : Yup.number().positive().max(10000).required(),
        categoriesIds: isDraft
            ? Yup.array().of(Yup.string()).min(3)
            : Yup.array().of(Yup.string()).min(3).required(),
        portions: isDraft
            ? Yup.number().min(1).positive()
            : Yup.number().min(1).positive().required(),
        image: isDraft ? Yup.string() : Yup.string().required(),
        steps: isDraft
            ? Yup.array()
                  .of(
                      Yup.object().shape({
                          stepNumber: Yup.number(),
                          description: Yup.string().max(300),
                          image: Yup.string().optional().nullable(),
                      }),
                  )
                  .min(1)
            : Yup.array()
                  .of(
                      Yup.object().shape({
                          stepNumber: Yup.number().required(),
                          description: Yup.string().max(300).required(),
                          image: Yup.string().optional().nullable(),
                      }),
                  )
                  .min(1),
        ingredients: isDraft
            ? Yup.array()
                  .of(
                      Yup.object().shape({
                          title: Yup.string().max(50),
                          count: Yup.number().positive(),
                          measureUnit: Yup.string(),
                      }),
                  )
                  .min(1)
                  .required()
            : Yup.array()
                  .of(
                      Yup.object().shape({
                          title: Yup.string().max(50).required(),
                          count: Yup.number().positive().required(),
                          measureUnit: Yup.string().required(),
                      }),
                  )
                  .min(1),
        meat: Yup.string(),
        garnish: Yup.string(),
    });

const _draftSchema = Yup.object().shape({
    title: Yup.string().max(50).required(),
    description: Yup.string().max(500),
    time: Yup.number().positive().max(10000),
    categoriesIds: Yup.array().of(Yup.string()).min(3),
    portions: Yup.number().min(1),
    image: Yup.string(),
    steps: Yup.array()
        .of(
            Yup.object().shape({
                stepNumber: Yup.number(),
                description: Yup.string().max(300),
                image: Yup.string().optional().nullable(),
            }),
        )
        .min(1),

    ingredients: Yup.array()
        .of(
            Yup.object().shape({
                title: Yup.string().max(50),
                count: Yup.number().positive(),
                measureUnit: Yup.string(),
            }),
        )
        .min(1),
    meat: Yup.string(),
    garnish: Yup.string(),
});

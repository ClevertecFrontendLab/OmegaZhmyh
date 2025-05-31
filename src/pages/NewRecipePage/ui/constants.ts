export const FORM_FIELDS = {
    TITLE: 'title',
    DESCRIPTION: 'description',
    TIME: 'time',
    CATEGORIES: 'categoriesIds',
    PORTIONS: 'portions',
    IMAGE: 'image',
    STEPS: 'steps',
    INGREDIENTS: 'ingredients',
    MEAT: 'meat',
    GARNISH: 'garnish',
} as const;

export const PLACEHOLDERS = {
    TITLE: 'Название рецепта',
    DESCRIPTION: 'Краткое описание рецепта',
    CATEGORIES: 'Выберите из списка...',
    PORTIONS: 'Количество порций',
    TIME: 'Время приготовления',
    STEP_DESCRIPTION: 'Шаг',
    INGREDIENT: 'Ингредиент',
    INGREDIENT_COUNT: '100',
    MEASURE_UNIT: 'Единица измерения',
} as const;

export const BUTTONS = {
    NEW_STEP: 'Новый шаг',
    SAVE_DRAFT: 'Сохранить черновик',
    PUBLISH: 'Опубликовать рецепт',
} as const;

export const RECIPE_MESSAGES = {
    DRAFT: {
        SUCCESS: 'Черновик успешно сохранен',
        SAVE_ERROR: 'Не удалось сохранить черновик рецепта',
    },
    RECIPE: {
        SUCCESS: 'Рецепт успешно опубликован',
        DUPLICATE_ENTITY: 'Рецепт с таким названием уже существует',
        SAVE_ERROR: 'Попробуйте пока сохранить в черновик',
    },
} as const;

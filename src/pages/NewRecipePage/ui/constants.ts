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
} as const;

export const LABELS = {
    CATEGORIES: 'Выберите не менее 3-х тегов',
    PORTIONS: 'На сколько человек ваш рецепт?',
    TIME: 'Сколько времени готовить в минутах?',
    STEPS: 'Добавьте шаги приготовления',
} as const;

export const BUTTONS = {
    NEW_STEP: 'Новый шаг',
    SAVE_DRAFT: 'Сохранить черновик',
    PUBLISH: 'Опубликовать рецепт',
} as const;

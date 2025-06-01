export type RecipesState = Recipe[];

export type CreateRecipe = {
    title: string;
    description: string;
    time: number;
    categoriesIds: string[];
    portions: number;
    image: string;
    steps: StepType[];
    ingredients: IngredientType[];
    meat?: string;
    garnish?: string;
};

export type Recipe = Required<CreateRecipe> & {
    authorId: string;
    nutritionValue: NutritionValueType;
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
    _id: string;
    garnish?: string;
    meat?: string;
};

export type NutritionValueType = {
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
};

export type IngredientType = {
    title: string;
    measureUnit: string;
    count?: number;
};

export type StepType = {
    stepNumber: number;
    description: string;
    image?: string | null;
};

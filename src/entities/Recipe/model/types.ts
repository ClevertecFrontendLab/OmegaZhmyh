export type RecipesState = Recipe[];

export type CreateRecipe = {
    title: string;
    description: string;
    time: number;
    categoriesIds: string[];
    meat?: string;
    garnish?: string;
    portions: number;
    image: string;
    steps: StepType[];
    ingredients: IngredientType[];
};

export type Recipe = CreateRecipe & {
    authorId: string;
    nutritionValue: NutritionValueType;
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
    _id: number;
};

export type NutritionValueType = {
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
};

export type IngredientType = {
    title: string;
    count: number;
    measureUnit: string;
};

export type StepType = {
    stepNumber: number;
    description: string;
    image?: string | null;
};

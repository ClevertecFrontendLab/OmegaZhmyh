export type RecipesState = Recipe[];

export interface Recipe {
    title: string;
    description: string;
    time: string;
    image: string;
    meat?: string;
    garnish?: string;
    portions?: number;
    authorId: string;
    categoriesIds: string[];
    steps: StepType[];
    nutritionValue: NutritionValueType;
    ingredients: IngredientType[];
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
    side?: string;
    category: string[];
    subcategory: string[];
    date: string;
    _id: number;
}

export type ShortRecipeType = Pick<
    Recipe,
    'title' | 'description' | 'category' | 'likes' | 'bookmarks'
>;

export interface NutritionValueType {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
}

export interface IngredientType {
    title: string;
    count: number;
    measureUnit: string;
}

export interface StepType {
    stepNumber: number;
    description: string;
    image: string;
}

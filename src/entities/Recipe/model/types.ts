export type RecipesState = RecipeType[];

export interface RecipeType {
    id: number;
    title: string;
    description: string;
    category: string[];
    subcategory: string[];
    image: string;
    bookmarks: number;
    likes: number;
    date: string;
    time: string;
    portions?: number;
    nutritionValue: NutritionValueType;
    ingredients: IngredientType[];
    steps: StepType[];
    meat?: string;
    side?: string;
}

export type ShortRecipeType = Pick<
    RecipeType,
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

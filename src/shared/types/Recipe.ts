export interface RecipeType {
    id: number;
    title: string;
    description: string;
    category: string[];
    subcategory: string[];
    image: string;
    bookmarks: number;
    likes: number;
    date: Date;
    time: string;
    portions?: number;
    nutritionValue: NutritionValueType;
    ingredients: IngredientType[];
    steps: StepType[];
    meat?: string;
    side?: string;
}

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

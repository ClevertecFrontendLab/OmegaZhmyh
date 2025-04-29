export interface BaseCategory {
    _id: string;
    title: string;
    category: string;
}

export interface MainCategory extends BaseCategory {
    icon: string;
    description: string;
    subCategories: SubCategory[];
}

export interface SubCategory extends BaseCategory {
    rootCategoryId: string;
}

export type Category = MainCategory | SubCategory;

export type CategoriesArray = Category[];

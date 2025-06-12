export type CategoryState = {
    mainCategories: MainCategory[];
    subCategories: SubCategory[];
    allCategories: CategoriesResponse;
};

export type BaseCategory = {
    _id: string;
    title: string;
    category: string;
};

export type MainCategory = BaseCategory & {
    icon: string;
    description: string;
    subCategories: SubCategory[];
};

export type SubCategory = BaseCategory & {
    rootCategoryId: string;
};
export type CategoriesResponse = (MainCategory | SubCategory)[];

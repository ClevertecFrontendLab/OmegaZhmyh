import { CategoriesResponse } from '~/shared/api/types';

export interface categoryState {
    mainCategories: MainCategory[];
    subCategories: SubCategory[];
    allCategories: CategoriesResponse;
}

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

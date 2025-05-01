import { ApplicationState } from '~/shared/store/configure-store';

export const selectPageCategory = (state: ApplicationState) => state.category.pageCategory;
export const selectPageSubcategory = (state: ApplicationState) => state.category.pageSubategory;
export const selectMainCategories = (state: ApplicationState) => state.category.mainCategories;
export const selectSubcategories = (state: ApplicationState) => state.category.subCategories;
export const selectAllCategories = (state: ApplicationState) => state.category.allCategories;

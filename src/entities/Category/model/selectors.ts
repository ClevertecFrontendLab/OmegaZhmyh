import { ApplicationState } from '~/shared/store/configure-store';

export const selectMainCategories = (state: ApplicationState) => state.category.mainCategories;
export const selectSubcategories = (state: ApplicationState) => state.category.subCategories;
export const selectAllCategories = (state: ApplicationState) => state.category.allCategories;

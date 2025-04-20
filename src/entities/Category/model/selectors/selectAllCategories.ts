import { ApplicationState } from '~/shared/store/configure-store';

export const selectAllCategories = (state: ApplicationState) => state.category.categoryList;

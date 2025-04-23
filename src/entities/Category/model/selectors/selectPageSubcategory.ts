import { ApplicationState } from '~/shared/store/configure-store';

export const selectPageSubcategory = (state: ApplicationState) => state.category.pageSubategory;

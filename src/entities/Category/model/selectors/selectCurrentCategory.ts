import { ApplicationState } from '~/shared/store/configure-store';

export const selectCurrentCategory = (state: ApplicationState) => state.category.currentCategory;

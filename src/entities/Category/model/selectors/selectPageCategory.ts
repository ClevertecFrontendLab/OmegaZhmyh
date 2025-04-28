import { ApplicationState } from '~/shared/store/configure-store';

export const selectPageCategory = (state: ApplicationState) => state.category.pageCategory;

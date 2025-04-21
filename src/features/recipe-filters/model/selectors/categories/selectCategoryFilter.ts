import { ApplicationState } from '~/shared/store/configure-store';

export const selectCategoryFilter = (state: ApplicationState) => state.filters.categories;

import { ApplicationState } from '~/shared/store/configure-store';

export const selectSubcategoryFilter = (state: ApplicationState) => state.filters.subcategories;

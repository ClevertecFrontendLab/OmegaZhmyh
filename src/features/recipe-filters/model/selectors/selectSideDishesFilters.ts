import { ApplicationState } from '~/shared/store/configure-store';

export const selectSideDishesFilters = (state: ApplicationState) => state.filters.sideDishes;

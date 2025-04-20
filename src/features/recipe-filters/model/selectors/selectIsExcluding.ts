import { ApplicationState } from '~/shared/store/configure-store';

export const selectIsExcluding = (state: ApplicationState) => state.filters.allergens.isExcluding;

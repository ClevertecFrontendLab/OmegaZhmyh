import { ApplicationState } from '~/shared/store/configure-store';

export const selectAllergenOptions = (state: ApplicationState) =>
    state.filters.options.allergenFilters;
export const selectCustomAllergen = (state: ApplicationState) =>
    state.filters.allergens.customAllergen;
export const selectIsExcluding = (state: ApplicationState) => state.filters.allergens.isExcluding;
export const selectSelectedAllergens = (state: ApplicationState) =>
    state.filters.allergens.selectedAllergens;

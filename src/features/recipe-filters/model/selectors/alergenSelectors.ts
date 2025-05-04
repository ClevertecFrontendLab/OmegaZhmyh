import { ApplicationState } from '~/shared/store/configure-store';

export const selectAllergenOptions = (state: ApplicationState) =>
    state.filters.options.allergenFilters;
export const selectCustomAllergen = (state: ApplicationState) =>
    state.filters.allergens.customAllergen;
export const selectIsExcluding = (state: ApplicationState) => state.filters.allergens.isExcluding;
export const selectSelectedAllergens = (state: ApplicationState) =>
    state.filters.allergens.selectedAllergens;
export const selectDrawerAllergens = (state: ApplicationState) =>
    state.filters.drawerUIState.allergens.selectedAllergens;
export const selectDrawerCustomAllergen = (state: ApplicationState) =>
    state.filters.drawerUIState.allergens.customAllergen;
export const selectIsDrawerExcluding = (state: ApplicationState) =>
    state.filters.drawerUIState.allergens.isExcluding;

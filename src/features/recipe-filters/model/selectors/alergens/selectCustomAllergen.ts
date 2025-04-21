import { ApplicationState } from '~/shared/store/configure-store';

export const selectCustomAllergen = (state: ApplicationState) =>
    state.filters.allergens.customAllergen;

import { ApplicationState } from '~/shared/store/configure-store';

export const selectSelectedAllergens = (state: ApplicationState) =>
    state.filters.allergens.selectedAllergens;

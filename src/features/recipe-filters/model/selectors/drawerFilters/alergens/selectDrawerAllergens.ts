import { ApplicationState } from '~/shared/store/configure-store';

export const selectDrawerAllergens = (state: ApplicationState) =>
    state.filters.drawerUIState.allergens.selectedAllergens;

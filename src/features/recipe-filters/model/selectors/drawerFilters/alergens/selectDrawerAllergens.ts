import { ApplicationState } from '~/shared/store/configure-store';

export const selectDrawerAllergens = (state: ApplicationState) =>
    state.filters.drawerFilters.allergens.selectedAllergens;

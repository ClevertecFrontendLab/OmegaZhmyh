import { ApplicationState } from '~/shared/store/configure-store';

export const selectDrawerCustomAllergen = (state: ApplicationState) =>
    state.filters.drawerUIState.allergens.customAllergen;

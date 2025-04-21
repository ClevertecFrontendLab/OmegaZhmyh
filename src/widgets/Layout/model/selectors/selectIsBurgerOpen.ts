import { ApplicationState } from '~/shared/store/configure-store';

export const selectIsBurgerOpen = (state: ApplicationState) => state.layout.isBurgerOpen;

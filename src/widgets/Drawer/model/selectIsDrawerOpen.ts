import { ApplicationState } from '~/shared/store/configure-store';

export const selectIsDrawerOpen = (state: ApplicationState) => state.drawer.isDrawerOpen;

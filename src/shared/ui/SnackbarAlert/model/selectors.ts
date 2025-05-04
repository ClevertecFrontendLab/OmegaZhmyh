import { ApplicationState } from '~/shared/store/configure-store';

export const selectNotification = (state: ApplicationState) => state.notification;

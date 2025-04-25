import { ApplicationState } from '~/shared/store/configure-store';

export const selectAuthorsFilter = (state: ApplicationState) => state.filters.drawerUIState.authors;

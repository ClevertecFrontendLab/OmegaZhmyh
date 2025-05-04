import { ApplicationState } from '../configure-store';

export const selectMainPageLoading = (state: ApplicationState) => state.loading.mainPage;
export const selectJuiciestPageLoading = (state: ApplicationState) => state.loading.juiciestPage;
export const selectCuisinePageLoading = (state: ApplicationState) => state.loading.cuisinePage;
export const selectRelevantKitchenLoading = (state: ApplicationState) =>
    state.loading.relevantKitchen;
export const selectCategoriesLoading = (state: ApplicationState) => state.loading.categories;

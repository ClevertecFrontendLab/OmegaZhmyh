import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from './configure-store';
export type AppState = typeof initialState;

const initialState = {
    isLoading: false,
    error: '' as string | null,
    relevantKitchenLoading: false,
    pageLoading: false,
    categoriesLoading: false,
};

const updateLoadingState = (state: AppState) => {
    state.isLoading = state.relevantKitchenLoading || state.pageLoading || state.categoriesLoading;
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError(state, { payload: error }: PayloadAction<string | null>) {
            state.error = error;
        },
        setRelevantKitchenLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.relevantKitchenLoading = isLoading;
            updateLoadingState(state);
        },
        setPageLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.pageLoading = isLoading;
            updateLoadingState(state);
        },
        setCategoriesLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.categoriesLoading = isLoading;
            updateLoadingState(state);
        },
    },
});
export const userLoadingSelector = (state: ApplicationState) => state.app.isLoading;
export const userErrorSelector = (state: ApplicationState) => state.app.error;

export const { setAppError, setRelevantKitchenLoader, setPageLoader, setCategoriesLoading } =
    appSlice.actions;
export default appSlice.reducer;

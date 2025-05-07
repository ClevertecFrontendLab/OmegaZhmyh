import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from './configure-store';
export type AppState = typeof initialState;

const initialState = {
    isLoading: false,
    error: '' as string | null,
    relevantKitchenLoading: false,
    pageLoading: false,
};
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError(state, { payload: error }: PayloadAction<string | null>) {
            state.error = error;
        },
        setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
        setRelevantKitchenLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.relevantKitchenLoading = isLoading;
            state.isLoading = state.relevantKitchenLoading || state.pageLoading;
        },
        setPageLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.pageLoading = isLoading;
            state.isLoading = state.relevantKitchenLoading || state.pageLoading;
        },
    },
});
export const userLoadingSelector = (state: ApplicationState) => state.app.isLoading;
export const userErrorSelector = (state: ApplicationState) => state.app.error;

export const { setAppError, setAppLoader, setRelevantKitchenLoader, setPageLoader } =
    appSlice.actions;
export default appSlice.reducer;

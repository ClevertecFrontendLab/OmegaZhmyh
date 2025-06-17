import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from './configure-store';
export type AppState = typeof initialState;

const initialState = {
    isLoading: false,
    relevantKitchenLoading: false,
    pageLoading: false,
    categoriesLoading: false,
    recipesLoading: false,
    blogsLoading: false,
    authLoading: false,
};

const updateLoadingState = (state: AppState) => {
    state.isLoading =
        state.authLoading ||
        state.categoriesLoading ||
        state.relevantKitchenLoading ||
        state.recipesLoading ||
        state.blogsLoading ||
        state.pageLoading;
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
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
        setAuthLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.authLoading = isLoading;
            updateLoadingState(state);
        },
        setRecipesLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.recipesLoading = isLoading;
            updateLoadingState(state);
        },
        setBlogsLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.blogsLoading = isLoading;
            updateLoadingState(state);
        },
    },
});
export const userLoadingSelector = (state: ApplicationState) => state.app.isLoading;

export const {
    setRelevantKitchenLoader,
    setPageLoader,
    setCategoriesLoading,
    setAuthLoading,
    setRecipesLoading,
    setBlogsLoading,
} = appSlice.actions;
export default appSlice.reducer;

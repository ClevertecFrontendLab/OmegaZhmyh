import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoadingState {
    mainPage: boolean;
    juiciestPage: boolean;
    cuisinePage: boolean;
    relevantKitchen: boolean;
    categories: boolean;
}

const initialState: LoadingState = {
    mainPage: false,
    juiciestPage: false,
    cuisinePage: false,
    relevantKitchen: false,
    categories: false,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setMainPageLoading(state, action: PayloadAction<boolean>) {
            state.mainPage = action.payload;
        },
        setJuiciestPageLoading(state, action: PayloadAction<boolean>) {
            state.juiciestPage = action.payload;
        },
        setCuisinePageLoading(state, action: PayloadAction<boolean>) {
            state.cuisinePage = action.payload;
        },
        setRelevantKitchenLoading(state, action: PayloadAction<boolean>) {
            state.relevantKitchen = action.payload;
        },
        setCategoriesLoading(state, action: PayloadAction<boolean>) {
            state.categories = action.payload;
        },
    },
});

export const {
    setMainPageLoading,
    setJuiciestPageLoading,
    setCuisinePageLoading,
    setRelevantKitchenLoading,
    setCategoriesLoading,
} = loadingSlice.actions;
export default loadingSlice.reducer;

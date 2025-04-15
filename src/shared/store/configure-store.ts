import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '~/shared/query/create-api';

import appReducer, { appSlice } from './app-slice';
import { recipeSlice } from './recipe-slice';
const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [recipeSlice.name]: recipeSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: !isProduction,
});

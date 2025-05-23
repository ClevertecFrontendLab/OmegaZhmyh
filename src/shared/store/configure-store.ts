import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { categorySlice } from '~/entities/Category/model/slice';
import { recipeSlice } from '~/entities/Recipe/model/slice';
import { authApi } from '~/features/auth';
import { authSlice } from '~/features/auth/model/authSlice';
import { filtersSlice } from '~/features/recipe-filters';
import { yeedaaApi } from '~/shared/api/yeedaaApi';
import { apiSlice } from '~/shared/query/create-api';
import { drawerSlice } from '~/widgets/Drawer';
import { layoutSlice } from '~/widgets/Layout/model/slice';

import { appSlice } from './app-slice';
import { notificationSlice } from './notificationSlice';

const isProduction = false;

const rootReducer = combineReducers({
    [appSlice.name]: appSlice.reducer,
    [recipeSlice.name]: recipeSlice.reducer,
    [categorySlice.name]: categorySlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [layoutSlice.name]: layoutSlice.reducer,
    [filtersSlice.name]: filtersSlice.reducer,
    [drawerSlice.name]: drawerSlice.reducer,
    [yeedaaApi.reducerPath]: yeedaaApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [notificationSlice.name]: notificationSlice.reducer,
    [authSlice.name]: authSlice.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(yeedaaApi.middleware, authApi.middleware),
    devTools: !isProduction,
});

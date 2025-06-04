import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { categorySlice } from '~/entities/category';
import { recipeSlice } from '~/entities/recipe';
import { authSlice } from '~/features/auth/model/authSlice';
import { filtersSlice } from '~/features/recipe-filters';
import { drawerSlice } from '~/widgets/drawer';
import { layoutSlice } from '~/widgets/layout';

import { yeedaaApi } from '../api/yeedaaApi';
import { appSlice } from './app-slice';
import { notificationSlice } from './notificationSlice';

const isProduction = false;

const rootReducer = combineReducers({
    [appSlice.name]: appSlice.reducer,
    [recipeSlice.name]: recipeSlice.reducer,
    [categorySlice.name]: categorySlice.reducer,
    [layoutSlice.name]: layoutSlice.reducer,
    [filtersSlice.name]: filtersSlice.reducer,
    [drawerSlice.name]: drawerSlice.reducer,
    [notificationSlice.name]: notificationSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [yeedaaApi.reducerPath]: yeedaaApi.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(yeedaaApi.middleware),
    devTools: !isProduction,
});

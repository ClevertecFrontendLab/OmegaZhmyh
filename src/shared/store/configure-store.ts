import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { categorySlice } from '~/entities/Category/model/slice';
import { recipeSlice } from '~/entities/Recipe/model/slice';
import { filterReducer } from '~/features/recipe-filters';
import { yeedaaApi } from '~/shared/api/yeedaaApi';
import { apiSlice } from '~/shared/query/create-api';
import { drawerReducer } from '~/widgets/Drawer';
import { layoutSlice } from '~/widgets/Layout/model/slice';

import { notificationReducer } from '../ui/SnackbarAlert';
import appReducer, { appSlice } from './app-slice';

const isProduction = false;

const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [recipeSlice.name]: recipeSlice.reducer,
    [categorySlice.name]: categorySlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [layoutSlice.name]: layoutSlice.reducer,
    filters: filterReducer,
    drawer: drawerReducer,
    [yeedaaApi.reducerPath]: yeedaaApi.reducer,
    notification: notificationReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(yeedaaApi.middleware),
    devTools: !isProduction,
});
